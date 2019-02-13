

function checkVisitor() {
  var password = prompt('Enter the password');

  if (password === '13451345') {
    var link = document.createElement('a');
    link.href = "http://travelize.michaldziadkowiec.pl";
    link.textContent = 'Visit Travelize web page'
    var div = document.querySelector('.links');
    div.appendChild(link);
  } else {
    checkVisitor();
  }
}

checkVisitor();

