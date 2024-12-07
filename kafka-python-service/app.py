import os
from flask import Flask, jsonify
from confluent_kafka import Consumer
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Flask App Setup
app = Flask(__name__)

# Kafka Configuration
conf = {
    'bootstrap.servers': os.getenv('KAFKA_BOOTSTRAP_SERVERS', 'localhost:9092'), 
    'group.id': os.getenv('KAFKA_GROUP_ID', 'default-group'),
    'auto.offset.reset': 'earliest',  # Ensure we consume from the beginning
    'enable.auto.commit': False,      # Disable auto commit of offsets
}

# Create Kafka Consumer
consumer = Consumer(conf)

# Kafka Topic
topic = os.getenv('KAFKA_TOPIC', 'default')  # Default to 'basedata' if not set
consumer.subscribe([topic])

# Flask Route to get messages
@app.route('/all', methods=['GET'])
def get_all_messages():
    # Poll for new messages
    message = consumer.poll(1.0)  # Timeout in seconds

    if message is None:
        return jsonify({"message": "No new messages."}), 200
    if message.error():
        return jsonify({"error": f"Error: {message.error()}"}), 500

    # Decode and return the received message as JSON
    message_value = message.value().decode('utf-8')
    return jsonify({"message": message_value})

# Kafka Consumer Logic (Polling in the main thread)
def consume_messages():
    print(f"Listening to messages from topic: {topic}")

    try:
        while True:
            # Poll for new messages
            message = consumer.poll(1.0)  # Timeout in seconds
            if message is None:
                continue  # No message available
            if message.error():
                print(f"Error: {message.error()}")
                continue

            # Print the received message to the console
            message_value = message.value().decode('utf-8')
            print(f"Received message: {message_value}")

    except KeyboardInterrupt:
        print("Exiting...")

    finally:
        consumer.close()

# Start consuming messages (in the main thread, no need for threading)
consume_messages()

# Run Flask app on localhost:3004
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=<test>)
