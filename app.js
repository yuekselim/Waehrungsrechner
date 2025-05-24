const btn = document.getElementById("convert-btn").addEventListener("click", change);
const refreshData = document.querySelector("#refresh-btn");
const from = document.getElementById("from");
const to = document.querySelector("#to");

document.addEventListener("DOMContentLoaded", onPageLoad);
document.getElementById("api-key-btn").addEventListener("click",onPageLoad)
function refreshWithKeyDaten(){   
}

function onPageLoad(){
    onDataLoad();
}
function selectValue(){
    const rates= GetRatesLocalStorages();
    for (let key in rates){
        document.querySelector("#from").innerHTML += `<option value="${key}">${key}</option>`;
        document.querySelector("#to").innerHTML += `<option value="${key}">${key}</option>`;
    }    
}

function onDataLoad()
{
    const userKey = document.getElementById("api-key").value.trim();
    const xhr = new XMLHttpRequest();
    if(userKey === "")
    {
         xhr.open("GET","rates.json",true);     
    }     
    else{
        localStorage.removeItem("rates");
        document.querySelector("#from").innerHTML = "";
        document.querySelector("#to").innerHTML = "";
        console.log("→ Daten werden mit API-Key geladen:");
        xhr.open("GET", `https://api.freecurrencyapi.com/v1/latest?apikey=${userKey}`, true);   
    }    
       xhr.onload = function(){
            if(xhr.status === 200){     
                const responce = JSON.parse(this.responseText);
                localStorage.setItem("rates", JSON.stringify(responce.data || responce));
                selectValue();              
            }
        }
        xhr.send();        
}
// Wechselkurse aus dem lokalen Speicher abrufen
function GetRatesLocalStorages(){
    return JSON.parse(localStorage.getItem("rates")) || [];
}
function change(){
        const rates = GetRatesLocalStorages();
        document.querySelector("#result").innerHTML = "";
        const amount = document.querySelector("#amount").value;
        const result = Number(amount) * (rates[to.value] /rates[from.value] );       
        document.querySelector("#result").appendChild(document.createTextNode(result));
};

