ReactDOM.render(
  <Portfolio />,
  document.getElementById('portfoliocontainer')
);
jQuery('.loadingscreen').css('opacity','0');
setTimeout(function() { jQuery('.loadingscreen').css('display','none');}, 1000);
