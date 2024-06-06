from app.modules import *

app = FastAPI()

origins = ["http://localhost:3000", "http://127.0.0.1:3000","http://localhost:3001", "http://127.0.0.1:3001"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(users.router)
app.include_router(search.router)
app.include_router(crud.router)
app.include_router(feed.router)


@app.get("/check")
def check():
    response = {"main.py : fastapi connection": "success"}
    return response
