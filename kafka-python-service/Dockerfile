# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the dependencies in the container
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 3004 for the Flask app
EXPOSE <test>

# Define the command to run the app
CMD ["python", "app.py"]
