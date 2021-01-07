from __main__ import app, db, limiter
from flask import request, make_response, jsonify, session
from bcrypt import checkpw
from models import User, Meme, PortfolioItem, PricePoint, Article
import datetime

"""
UTILITY FUNCTIONS
"""

def error(message, code):
    return make_response(message, code)

@app.errorhandler(429)
def error_429(e):
    return error('To prevent abuse, certain activites on the Memedaq are rate limited. We apologize for the inconvenience', 429)



def require_login(f):
    def wrapper():
        if session.get('uid') == None:
            return error('You must be signed in to perform this operation.', 401)
        else:
            user = db.session.query(User).get(session.get('uid'))
            return f(user=user)
    wrapper.__name__ = f.__name__
    return wrapper



def require_admin(f):
    @require_login
    def wrapper(user):
        if not user.admin:
            return error('You don\'t have permission to perform this operation.', 401)
        else:
            return f(user=user)
    wrapper.__name__ = f.__name__
    return wrapper

def require_args_json(args):
    def decorator(f):
        def wrapper():
            if not request.get_json():
                 return error('Invalid request', 400)
            for arg in args:
                if not request.get_json().get(arg):
                    return error('Invalid request', 400)
            return f()

        wrapper.__name__ = f.__name__
        return wrapper
    return decorator
    


"""
    SIGN UP, SIGN IN, SIGN OUT, SESSION INFO, USER DATA
"""

@app.route('/api/v1/signup', methods=['POST'])
@app.route('/api/v1/signup/', methods=['POST'])
#@limiter.limit('1 per day')
def route_signup():
    username = request.get_json().get('username')
    password = request.get_json().get('password')
    password_confirm = request.get_json().get('passwordConfirm')
    if not username or not password or not password_confirm:
        return error('All fields are required.', 400)
    if password != password_confirm:
        return error('Passwords don\'t match', 400)

    username = str(username).lower()

    users = db.session.query(User).filter_by(username=username)
    if users.count() > 0:
        return error('That username is not available.', 409)


    new_user = User(username, str(password))
    db.session.add(new_user)
    db.session.commit()

    return make_response('Account created.', 201)



@app.route('/api/v1/signin', methods=['POST'])
@app.route('/api/v1/signin/', methods=['POST'])
def route_signin():

    username = request.get_json().get('username')
    password = request.get_json().get('password')

    if not username or not password:
        return error('All fields are required.', 400)

    login_error = 'Invalid username or password.'

    username = str(username).lower()
    password = str(password)

    user = db.session.query(User).filter_by(username=username).first()
    if not user or not checkpw(bytes(password.encode('utf-8')), bytes(user.password_hash.encode('utf-8'))):
        return error(login_error, 400)

    session['uid'] = user.id

    return make_response('', 200)



@app.route('/api/v1/signout')
@app.route('/api/v1/signout/')
@require_login
def route_signout(user):
    session.pop('uid', None)
    response = make_response('', 200)
    response.set_cookie('session', '', expires=0)
    return response



@app.route('/api/v1/session', methods=['GET'])
@app.route('/api/v1/session/', methods=['GET'])
def route_session():

    if 'uid' in session:
        return make_response('', 200)
    else:
        return make_response('', 400)



@app.route('/api/v1/userdata')
@app.route('/api/v1/userdata/')
@require_login
def route_userdata(user):
    return make_response({
        'uid' : user.id,
        'username' : user.username,
        'email' : user.email,
        'balance' : user.balance,
        'admin': user.admin
    }, 200)



"""
    MEMES & PORTFOLIO
"""



@app.route('/api/v1/stonks')
@app.route('/api/v1/stonks/')
def route_stonks():
    memes = db.session.query(Meme).limit(25).all()
    output = []
    for meme in memes:
        output.append({
            'id': meme.id,
            'name': meme.name,
            'image_url': meme.image_url,
            'trading_price': meme.trading_price,
            'stock': meme.stock,
            'cringe': meme.cringe,
            'creation_date': meme.creation_date
        })
    return make_response(jsonify(output), 200)
    


@app.route('/api/v1/portfolio')
@app.route('/api/v1/portfolio/')
@require_login
def route_portfolio(user):
    output = []
    for item in user.portfolio_items:
        meme = item.meme
        output.append({
            'id': meme.id,
            'name': meme.name,
            'price': meme.trading_price,
            'quantity': item.meme_count
        })
    return make_response(jsonify(output), 200)



@app.route('/api/v1/meme/<id>', methods=['GET'])
@app.route('/api/v1/meme/<id>/', methods=['GET'])
def route_get_meme(id):
    meme = db.session.query(Meme).get(id)
    if meme == None:
        return error('That meme does not exist.', 404)
    else:
        return make_response({
            'id': meme.id,
            'name': meme.name,
            'image_url': meme.image_url,
            'trading_price': meme.trading_price,
            'stock': meme.stock,
            'cringe': meme.cringe,
            'creation_date': meme.creation_date
        }, 200)



@app.route('/api/v1/meme/create', methods=['POST'])
@app.route('/api/v1/meme/create/', methods=['POST'])
@require_args_json(['name', 'imageUrl', 'tradingPrice', 'stock'])
@require_admin
def route_create_meme(user):
    json = request.get_json()
    name = json.get('name')
    imageUrl = json.get('imageUrl')
    price = int(json.get('tradingPrice'))
    stock = int(json.get('stock'))
    meme = Meme(name, imageUrl, price, stock)
    db.session.add(meme)
    db.session.commit()
    return make_response({'id': meme.id }, 200)



@app.route('/api/v1/meme/delete', methods=['POST'])
@app.route('/api/v1/meme/delete/', methods=['POST'])
@require_args_json(['id'])
@require_admin
def route_delete_meme(user):
    meme_id = int(request.get_json().get('id'))
    meme = db.session.query(Meme).get(meme_id)
    db.session.delete(meme)
    db.session.commit()
    return make_response('', 200)



@app.route('/api/v1/price_history')
@app.route('/api/v1/price_history/')
def route_price_history():

    if 'memeId' not in request.args:
        return error('Invalid requst')

    meme_id = int(request.args['memeId'])
    num_days = int(request.args['numDays']) if 'numDays' in request.args else 7

    if(num_days < 1):
        return error('numDays cannot be < 1.', 200)

    current_date = datetime.datetime.utcnow()
    past_date = current_date - datetime.timedelta(days=num_days)
    price_points = db.session.query(PricePoint).filter(db.and_(PricePoint.date >= past_date, PricePoint.date <= current_date, PricePoint.meme_id == meme_id))
    output = []
    for point in price_points:
        output.append(point.as_dict())

    return make_response(jsonify(output), 200)



@app.route('/api/v1/invest', methods=['POST'])
@app.route('/api/v1/invest/', methods=['POST'])
@require_login
def route_invest(user):

    #Input validation
    json = request.get_json()
    if not json.get('memeId') or not json.get('quantity'):
        return error('Invalid request', 400)
    meme_id = int(json.get('memeId'))
    quantity = int(json.get('quantity'))

    #Make sure the meme exists
    meme = db.session.query(Meme).get(meme_id)
    if not meme:
        return error('The specified meme does not exist.', 404)

    #Make sure you're not buying more of the meme than exists
    if quantity > meme.stock:
        return error('Not enough in stock', 400)

    #Check funds
    total_cost = meme.trading_price * quantity
    if total_cost > user.balance:
        return error('Insufficient funds', 400)
    

    #Check to see if they already own some of the meme and act accordingly
    portfolio_item = db.session.query(PortfolioItem).filter_by(user_id=user.id, meme_id=meme.id).first()
    if not portfolio_item:
        new_portfolio_entry = PortfolioItem()
        new_portfolio_entry.meme = meme
        new_portfolio_entry.user = user
        new_portfolio_entry.meme_count = quantity
        user.balance -= total_cost
        meme.stock -= quantity
        db.session.add(meme)
        db.session.add(new_portfolio_entry)
        db.session.add(user)
        db.session.commit()
        return make_response('', 200)
    else:
        portfolio_item.meme_count += quantity
        user.balance -= total_cost
        meme.stock -= quantity
        db.session.add(meme)
        db.session.add(portfolio_item)
        db.session.add(user)
        db.session.commit()
        return make_response('', 200)



@app.route('/api/v1/sell', methods=['POST'])
@app.route('/api/v1/sell/', methods=['POST'])
@require_login
def route_sell(user):

    #Input validation
    json = request.get_json()
    if not json.get('memeId') or not json.get('quantity'):
        return error('Invalid request', 400)
    meme_id = int(json.get('memeId'))
    quantity = int(json.get('quantity'))

    #Make sure the meme exists
    meme = db.session.query(Meme).get(meme_id)
    if not meme:
        return error('The specified meme does not exist.', 404)

    #Make sure they own the meme.
    portfolio_item = db.session.query(PortfolioItem).filter_by(user_id=user.id, meme_id=meme.id).first()
    if not portfolio_item:
        return error('You don\'t own that meme, so how can you sell it?', 400)
    else:
        portfolio_item.meme_count -= quantity
        user.balance += quantity * meme.trading_price
        if portfolio_item.meme_count == 0:
            db.session.delete(portfolio_item)
        else:
            db.session.add(portfolio_item)
        db.session.add(user)
        db.session.commit()
        return make_response('', 200)



@app.route('/api/v1/news/<int:page>')
@app.route('/api/v1/news/<int:page>/')
def route_news(page=1):
    articles = db.session.query(Article).order_by(Article.id.desc()).paginate(page, 10, error_out=False)
    output = []
    for item in articles.items:
        output.append({
            'id': item.id,
            'title': item.title,
            'description': item.description
        })
    

    return make_response(jsonify(output), 200)



@app.route('/api/v1/article/<id>')
@app.route('/api/v1/article/<id>/')
def route_article(id):
    id = int(id)
    output = db.session.query(Article).get(id)
    if not output:
        return error('That article does not exist.', 404)
    else:
        return {
            'id': output.id,
            'title': output.title,
            'description': output.description,
            'text': output.text,
            'creation_date': output.creation_date
        }



@app.route('/api/v1/article/create', methods=['POST'])
@app.route('/api/v1/article/create/', methods=['POST'])
@require_login
def route_create_article(user):
    if not user.admin:
        return error('You don\'t have permission to perform this operation.', 401)
    
    json = request.get_json()
    title = json.get('title')
    description = json.get('description')
    text = json.get('text')

    if not title or not description or not text:
        return error('Invalid request', 400)

    article = Article(title, description, text)
    db.session.add(article)
    db.session.commit()

    return make_response('', 200)



@app.route('/api/v1/article/edit', methods=['POST'])
@app.route('/api/v1/article/edit/', methods=['POST'])
@require_admin
def route_edit_article(user):
    
    json = request.get_json()
    id = json.get('id')
    title = json.get('title')
    description = json.get('description')
    text = json.get('text')

    if not id or not title or not description or not text:
        return error('Invalid request', 400)

    id = int(id)

    article = db.session.query(Article).get(id)
    if not article:
        return error('That article does not exist', 404)
    
    article.title = title
    article.description = description
    article.text = text

    db.session.add(article)
    db.session.commit()

    return make_response('', 200)


@app.route('/api/v1/highscores')
@app.route('/api/v1/highscores/')
def route_highscores():
    users = db.session.query(User).order_by(User.balance.desc()).limit(25)
    output = []
    for user in users:
        output.append({'username': user.username, 'balance': user.balance})
    return make_response(jsonify(output), 200)

