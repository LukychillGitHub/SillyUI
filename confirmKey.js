document.addEventListener("DOMContentLoaded", () => {
    let waitingForConfirmation = false;
    let savedInput = null;
    let pressedKey = '';
    let actionType = '';
    let secondChance = false;
    let secondChanceCount = 0;
  
    document.addEventListener("keydown", (e) => {
      if (waitingForConfirmation) {
        e.preventDefault();
        return;
      }
  
      e.preventDefault();
  
      savedInput = document.activeElement;
      if (!savedInput || savedInput.tagName !== "INPUT") return;
  
      if (e.key === "Backspace") {
        const currentValue = savedInput.value;
        const lastChar = currentValue.slice(-1) || 'nothing';
        if (lastChar === 'nothing') return;
        pressedKey = lastChar;
        actionType = 'delete';
      } else if (e.key.length === 1) {
        pressedKey = e.key;
        actionType = 'write';
      } else {
        return;
      }
  
      waitingForConfirmation = true;
      secondChance = false;
      showConfirmation();
    });
  
    function showConfirmation() {
      const overlay = document.createElement("div");
      overlay.id = "keyOverlay";
      overlay.innerHTML = `
        <div class="popup ${secondChance ? 'rage' : ''}">
          <p class="${secondChance ? 'popup-warning' : ''}">
             ${secondChance
                ? (secondChanceCount >= 3
                    ? `You seem to press 'No' a lot, huh?`
                    : `ARE YOU ABSOLUTELY SURE?`)
                : actionType === 'write' 
                ? `You pressed "${pressedKey}", are you sure?`
                : `Do you really want to delete "${pressedKey}"?`}
            </p>
          <div class="popup-buttons">
            <button id="yesBtn">Yes</button>
            <button id="noBtn">No</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
  
      const yesBtn = document.getElementById("yesBtn");
      const noBtn = document.getElementById("noBtn");
  
      yesBtn.addEventListener("click", () => {
        if (savedInput && savedInput.tagName === "INPUT") {
          if (actionType === 'write') {
            savedInput.value += pressedKey;
          } else if (actionType === 'delete') {
            savedInput.value = savedInput.value.slice(0, -1);
          }
          savedInput.focus();
        }
        overlay.remove();
        waitingForConfirmation = false;
      });
  
      noBtn.addEventListener("click", () => {
        overlay.remove();
        if (!secondChance) {
          secondChance = true;
          secondChanceCount++; // 👈 acumulamos
          showConfirmation();  // volvemos a mostrar el modal
        } else {
          waitingForConfirmation = false;
        }
      });      
    }
  });
  
  