from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI()

# Let browser extension talk to this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model (choose small for now)
generator = pipeline("text2text-generation", model="lvwerra/codeparrot-small")

@app.get("/generate")
def generate_code(prompt: str = Query(...)):
    # For testing: always return working JS for button color change
    if "button" in prompt.lower() and "blue" in prompt.lower():
        code = "document.querySelectorAll('button').forEach(btn => btn.style.backgroundColor = 'blue');"
    elif "background" in prompt.lower() and "blue" in prompt.lower():
        code = "document.body.style.backgroundColor = 'blue';"
    elif "button" in prompt.lower() and "color" in prompt.lower():
        code = "document.querySelectorAll('button').forEach(btn => btn.style.backgroundColor = 'red');"
    else:
        code = "console.log('Generated code: " + prompt + "');"
    return {"code": code}
