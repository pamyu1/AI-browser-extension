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
generator = pipeline("text-generation", model="lvwerra/codeparrot-small")

@app.get("/generate")
def generate_code(prompt: str = Query(...)):
    try:
        # Try to use AI model first - optimized for speed
        result = generator(
            f"// {prompt}\n", 
            max_new_tokens=30,  # Limit new tokens for faster generation
            num_return_sequences=1, 
            do_sample=False,  # Disable sampling for faster generation
            truncation=True,  # Explicitly enable truncation
            pad_token_id=50256  # Set pad token to avoid warnings
        )
        code = result[0]['generated_text'].replace(f"// {prompt}\n", "").strip()
    except Exception as e:
        # Fallback to pattern matching if AI model fails
        print(f"AI model failed: {e}, using fallback")
        if "button" in prompt.lower() and "blue" in prompt.lower():
            code = "document.querySelectorAll('button').forEach(btn => btn.style.backgroundColor = 'blue');"
        elif "background" in prompt.lower() and "blue" in prompt.lower():
            code = "document.body.style.backgroundColor = 'blue';"
        elif "button" in prompt.lower() and "color" in prompt.lower():
            code = "document.querySelectorAll('button').forEach(btn => btn.style.backgroundColor = 'red');"
        else:
            code = "console.log('Generated code: " + prompt + "');"
    return {"code": code}
