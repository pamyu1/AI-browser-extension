document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("send").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt").value;
    console.log("Sending prompt:", prompt);

    try {
      const response = await fetch("http://localhost:8000/generate?prompt=" + encodeURIComponent(prompt));
      const data = await response.json();
      console.log("Received response:", data);

      // Define the function to inject based on the prompt
      let scriptFunction;
      
      // Extract color from prompt (look for common color names)
      const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white', 'gray', 'grey', 'brown', 'cyan', 'magenta', 'lime', 'navy', 'maroon', 'olive', 'teal', 'silver', 'gold'];
      let foundColor = null;
      
      for (let color of colors) {
        if (prompt.toLowerCase().includes(color)) {
          foundColor = color;
          break;
        }
      }
      
      if (prompt.toLowerCase().includes("button") && foundColor) {
        scriptFunction = function(color) {
          document.querySelectorAll('button').forEach(btn => btn.style.backgroundColor = color);
        };
      } else if (prompt.toLowerCase().includes("background") && foundColor) {
        scriptFunction = function(color) {
          document.body.style.backgroundColor = color;
        };
      } else if (prompt.toLowerCase().includes("text") && foundColor) {
        scriptFunction = function(color) {
          document.body.style.color = color;
        };
      } else if (prompt.toLowerCase().includes("hide")) {
        if (prompt.toLowerCase().includes("button")) {
          scriptFunction = function() {
            document.querySelectorAll('button').forEach(btn => btn.style.display = 'none');
          };
        } else if (prompt.toLowerCase().includes("image")) {
          scriptFunction = function() {
            document.querySelectorAll('img').forEach(img => img.style.display = 'none');
          };
        } else {
          scriptFunction = function() {
            console.log('Hide command not recognized');
          };
        }
      } else if (prompt.toLowerCase().includes("show")) {
        if (prompt.toLowerCase().includes("button")) {
          scriptFunction = function() {
            document.querySelectorAll('button').forEach(btn => btn.style.display = 'block');
          };
        } else if (prompt.toLowerCase().includes("image")) {
          scriptFunction = function() {
            document.querySelectorAll('img').forEach(img => img.style.display = 'block');
          };
        }
      } else if (prompt.toLowerCase().includes("bigger") || prompt.toLowerCase().includes("larger")) {
        scriptFunction = function() {
          document.body.style.fontSize = '20px';
        };
      } else if (prompt.toLowerCase().includes("smaller")) {
        scriptFunction = function() {
          document.body.style.fontSize = '12px';
        };
      } else if (prompt.toLowerCase().includes("bold")) {
        scriptFunction = function() {
          document.body.style.fontWeight = 'bold';
        };
      } else if (prompt.toLowerCase().includes("italic")) {
        scriptFunction = function() {
          document.body.style.fontStyle = 'italic';
        };
      } else if (prompt.toLowerCase().includes("underline")) {
        scriptFunction = function() {
          document.body.style.textDecoration = 'underline';
        };
      } else if (prompt.toLowerCase().includes("normal text") || prompt.toLowerCase().includes("reset text")) {
        scriptFunction = function() {
          document.body.style.fontWeight = 'normal';
          document.body.style.fontStyle = 'normal';
          document.body.style.textDecoration = 'none';
        };
      } else if (prompt.toLowerCase().includes("arial")) {
        scriptFunction = function() {
          document.body.style.fontFamily = 'Arial, sans-serif';
        };
      } else if (prompt.toLowerCase().includes("times")) {
        scriptFunction = function() {
          document.body.style.fontFamily = 'Times New Roman, serif';
        };
      } else if (prompt.toLowerCase().includes("courier")) {
        scriptFunction = function() {
          document.body.style.fontFamily = 'Courier New, monospace';
        };
      } else if (prompt.toLowerCase().includes("comic")) {
        scriptFunction = function() {
          document.body.style.fontFamily = 'Comic Sans MS, cursive';
        };
      } else if (prompt.toLowerCase().includes("center text")) {
        scriptFunction = function() {
          document.body.style.textAlign = 'center';
        };
      } else if (prompt.toLowerCase().includes("left text")) {
        scriptFunction = function() {
          document.body.style.textAlign = 'left';
        };
      } else if (prompt.toLowerCase().includes("right text")) {
        scriptFunction = function() {
          document.body.style.textAlign = 'right';
        };
      } else {
        scriptFunction = function() {
          console.log('Extension executed for prompt:', arguments[0]);
        };
      }

      // Execute the script
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: scriptFunction,
            args: [foundColor || prompt]
          }).then(() => {
            console.log("Script executed successfully");
          }).catch((error) => {
            console.error("Script execution failed:", error);
          });
        }
      });
    } catch (error) {
      console.error("Error handling response:", error);
    }
  });
});
