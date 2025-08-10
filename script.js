document.addEventListener("DOMContentLoaded" , () => {
    const output = document.querySelector(".output h1");
    let calculation = "";
    const operators = ["+" , "-" , "*" , "/" , "%"];
    const buttons = document.querySelectorAll(".buttons-container button");
    buttons.forEach(button => {
        button.addEventListener("click" , () => {
            let value = button.textContent;
            const lastChar = calculation.slice(-1);

            if(value === "C"){
                calculation = "";
                output.textContent ="";
            }else if(value === "="){
                if(calculation){
                    if (operators.includes(lastChar) && lastChar !== "%") {
                        calculation = calculation.slice(0, -1);
                    }
                    calculation = calculation.replace(/%/g,"/100");
                    calculation = eval(calculation).toString();
                    output.textContent = calculation;
                }
            }
            else{
                if(operators.includes(value)){
                    if(calculation === "" && value !== "-") return; // only '-' allowed at start
                    if(value === "=" || value === "%" || value === "*" || value === "/"){
                        if(calculation === "") return; // block =, %, *, / at start
                    }
                    if(lastChar === "."){
                        calculation = calculation.slice(0, -1) + value;
                    }else if(operators.includes(lastChar)){
                        calculation = calculation.slice(0,-1) + value;
                    }else{
                        calculation += value;
                    }
                }else if(value === "."){
                    const lastNumber = calculation.split(/[\+\-\*\/%]/).pop();
                    if(!lastNumber.includes(".")){
                        if(lastNumber === ""){
                            calculation += "0.";
                        } else {
                            calculation += value;
                        }
                    }
                }else{
                    const lastNumber = calculation.split(/[\+\-\*\/%]/).pop();
                    const digitsCount = lastNumber.replace(".", "").length;
                    if(digitsCount < 9){
                        calculation += value;
                    }
                }
                let parts = calculation.split(/([\+\-\*\/%])/);
                for(let i = 0; i < parts.length; i++){
                    if(!operators.includes(parts[i])){
                        let num = parts[i];
                        if(num.length > 1 && !num.startsWith("0.")){
                            num = num.replace(/^0+(?!$)/, "");
                            parts[i] = num;
                        }
                    }
                }
                calculation = parts.join("");
                output.textContent = calculation;
            }
        })
    });
    const deleteIcon = document.querySelector(".delete-icon");
    deleteIcon.addEventListener("click", () => {
        calculation = calculation.slice(0, -1);
        output.textContent = calculation;
    });
});
