install and run docker.

within the folder of `docker-compose.yaml` file, run the command
`docker compose up`
this initialises the cassandra network with running cassandra nodes

within backend folder,
create a virtual environment with the following command,
`python -m venv venvi`

activate the environment with the following command,
`source venvi/Scripts/activate`

install the necessary libraries from the `requirements.txt` file with the following command,
`pip install -r "requirements.txt"`

to run fastapi instance, run the following command (make sure that the terminal is present within the bakend folder)
`uvicorn app.main:app --reload`

within frontend folder,
to install necessary libraries, run the following command

`npm run next`

to run the nextjs project, run the following command
`npm run dev`