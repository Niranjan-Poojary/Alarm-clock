//Initial Referances
let timerRef=document.querySelector(".timer-display");
const hourInput=document.getElementById("hourInput");
const minuteInput=document.getElementById("minuteInput");
const secondInput=document.getElementById("secondInput");
const activeAlarms=document.querySelector(".activeAlarms");
const setAlarm=document.getElementById("set");
let alarmsArray=[];
let alarmSound=new Audio("./alarm.mp3");

let initialHour=0,
    initialMinute=0,
    initialSecond=0,
    alarmIndex=0;


    //Append zeroes for single digit
    const appendZero=(value) =>(value<10 ? "0" + value:value);

    //Search for value in object

    const searchObject = (parameter,value) =>{
        let alarmObject, 
        objIndex,
        exists=false;

        alarmsArray.forEach((alarm,index)=>{
            if(alarm[parameter]==value){
                exists=true;
                alarmObject=alarm;
                objIndex=index;
                return false;
            }
        });
        return [exists, alarmObject,objIndex];
        
     };

     //Display Time
    function displayTimer() {
        let date = new Date();
        let [hours,minutes,seconds]=[
            appendZero(date.getHours()),
            appendZero(date.getMinutes()),
            appendZero(date.getSeconds()),
        ];
        
    
         //Display  current time 

        timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;
    
        //Set the alarm here
        //Play the alarm audio at right time
        alarmsArray.forEach((alarm,index)=> {
            if(alarm.isActive) {
                if(`${alarm.alarmHour}:${alarm.alarmMinute}:${alarm.alarmSecond}`===
                `${hours}:${minutes}:${seconds}`
                ){
                   alarmSound.play();
                   alarmSound.loop=true;
                   alert(`Hey! its is ${timerRef.innerHTML}`) 
               
                }
               
            }
           
        });
       

    }
  
     
     const inputCheck=(inputValue) => {
        inputValue=parseInt(inputValue);
        if(inputValue<10){
            inputValue = appendZero(inputValue);
        }
        return inputValue;
     };

     hourInput.addEventListener("input",()=>{
        hourInput.value = inputCheck(hourInput.value);
     });

     minuteInput.addEventListener("input",()=>{
        minuteInput.value = inputCheck(minuteInput.value);
     });

     secondInput.addEventListener("input",()=>{
        secondInput.value = inputCheck(secondInput.value);
     });

     const createAlarm =(alarmObj) =>{
        //keys from object
        const {id,alarmHour,alarmMinute,alarmSecond}=alarmObj;
        //Alarm div
        let alarmDiv = document.createElement("div");
        alarmDiv.classList.add("alarm");
        alarmDiv.setAttribute("data-id",id);
        alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}:${alarmSecond}</span>`;

        //checkbox
        //checkbox is used to start and stop the alarm
        let checkbox=document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.addEventListener("click",(e)=>{
            if(e.target.checked){
                startAlarm(e);
            }else{
                stopAlarm(e);
            }
        });
         alarmDiv.appendChild(checkbox);
         //Delete button
         //Setting the delete button to delete the alarm list
         let deleteButton = document.createElement("button");
         deleteButton.innerHTML=`<i class="fa-solid fa-trash-can"></i>`;
         deleteButton.classList.add("deleteButton");
         deleteButton.addEventListener("click",(e)=>
         deleteAlarm(e));
         alarmDiv.appendChild(deleteButton);
         activeAlarms.appendChild(alarmDiv);          
     };

     //set Alarm
     //event to set the new alarm
     setAlarm.addEventListener("click",()=>{
        alarmIndex +=1;

        //alarm object
        let alarmObj = {};
        alarmObj.id=`${alarmIndex}_${hourInput.value}_${minuteInput.value}_${secondInput.value}`;
        alarmObj.alarmHour=hourInput.value;
        alarmObj.alarmMinute=minuteInput.value;
        alarmObj.alarmSecond=secondInput.value;
        alarmObj.isActive=false;
        console.log(alarmObj);
        alarmsArray.push(alarmObj);
        createAlarm(alarmObj);
        hourInput.value=appendZero(initialHour);
        minuteInput.value=appendZero(initialMinute);
        secondInput.value=appendZero(initialSecond);
     });

     //start alarm
     //start the alarm from alarm list when click on the checkbox
     const startAlarm=(e)=>{
        let searchId=e.target.parentElement.getAttribute("data-id");
        let [exists,obj,index] = searchObject("id",searchId);

        if(exists){
            alarmsArray[index].isActive=true;
        }
     };
    
        //stop alarm
        //stop the alarm from alarm list when click on the checkbox
        const stopAlarm=(e)=>{
            let searchId=e.target.parentElement.getAttribute("data-id");
            let [exists,obj,index] = searchObject("id",searchId);
    
            if(exists){
                alarmsArray[index].isActive=false;
                alarmSound.pause();
            }
         };

     //delete Alram
     //delete alarm from alarm list and web page when delete button clicked
     const deleteAlarm=(e)=>{
        let searchId=e.target.parentElement.parentElement.getAttribute("data-id");
        let [exists,obj,index] = searchObject("id",searchId);

        if(exists){
            e.target.parentElement.parentElement.remove();
            alarmsArray.splice(index,1);
        }
     };



    window.onload = () => {
        setInterval(displayTimer);
        initialHour = 0;
        initialMinute=0;
        initialSecond=0;
        alarmIndex = 0;
        alarmsArray = [];
        hourInput.value = appendZero(initialHour);
        minuteInput.value = appendZero(initialMinute);
        secondInput.value=appendZero(initialSecond);

    }
    