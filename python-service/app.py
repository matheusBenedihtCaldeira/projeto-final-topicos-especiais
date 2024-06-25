from flask import Flask, request, jsonify
import joblib
import numpy as np

#Loading StandardScaler to standardize incoming data before sending to the model
standardScaler = joblib.load('model/StandardScaler.pkl')
#Loading already trained Naive Bayes model
model = joblib.load('model/NaiveBayesModel.pkl')
#Initializing flask application
app = Flask(__name__)

@app.route('/test', methods=['GET'])
def test_route():
  #  return jsonify({'message': 'Model Application'})

#Defining prediction route, responsible for receiving data and sending it to the model
@app.route('/predict', methods=['POST'])
def predict_route():
    #Getting data sent by post request
    data = request.get_json(force=True)
    #Converting the data to a numpy array
    data_values = np.array(list(data.values()))
    data_values = data_values.reshape(1, -1)
    #Standardizing the data
    standardizedData = standardScaler.transform(data_values[:,1:])
    #Inserting the standardized data into the array
    data_values[0,1:] = standardizedData
    #Sending the data to the model
    predict = model.predict(data_values)
    #Returning result
    return jsonify({'result': predict.tolist()[0]})
if __name__ == '__main__':
    app.run()