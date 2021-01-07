cd server/
sudo rm -dr env/
sudo rm -dr venv/
virtualenv env
source ./env/bin/activate
pip3 install -r requirements.txt
cd ..
cd memedaq-client
npm i
cd ..
echo "Installation complete."
