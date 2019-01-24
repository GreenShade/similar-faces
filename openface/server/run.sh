#!/bin/bash

export FLASK_APP=server
export FLASK_ENV=dev
flask run --host 0.0.0.0 --port 5001
