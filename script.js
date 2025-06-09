const synth = window.speechSynthesis;
const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
const speedInput = document.getElementById("speed");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");
const pauseBtn = document.getElementById("pauseBtn"); 
const resumeBtn = document.getElementById("resumeBtn");
function loadVoices(){
   const voices=synth.getVoices();
   voiceSelect.innerHTML=voices
.map(
   (voice)=>`
<option value="${voice.name}">
${voice.name} (${voice.lang}
)
</option>`

)
.join("");

}
function speakText(){
   if (synth.speaking) synth.cancel();
   const text=textInput.value.trim();
   if(text==="") return;
   const utterance=new SpeechSynthesisUtterance(text);
   const selectedVoice=voiceSelect.value;
   utterance.voice=synth.getVoices().find((voice)=>voice.name===selectedVoice)
   utterance.rate = speedInput.value;
  synth.speak(utterance);


}

speakBtn.addEventListener("click",speakText);
stopBtn.addEventListener("click",()=>synth.cancel());
pauseBtn.addEventListener("click", () => {
   if (synth.speaking) {
       synth.pause();
   }
});

resumeBtn.addEventListener("click", () => {
   if (synth.paused) {
       synth.resume();
   }
});
synth.addEventListener("voiceschanged", loadVoices);
loadVoices();



