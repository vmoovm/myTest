function getScreenWidth(){
  var smallerSide = Math.min(screen.width, screen.height);
  var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
  var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
  if(fixViewPortsExperiment){
    if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
      smallerSide = smallerSide/window.devicePixelRatio;
    }
  }
  return smallerSide;
}