function getPref() {
  return new Promise ((resolve, reject) => {
    chrome.storage.sync.get({'darknPref': ''}, pref => {
      if (!chrome.runtime.error) {
        resolve(pref);
      } else {
        reject();
      }
    });
  });
}

function setPref(pref) {
  chrome.storage.sync.set({'darknPref': pref}, () => {
    chrome.runtime.error && console.log('Runtime error.');
  });
}

function toggleUI() {
  const container = document.querySelector('body');

  if (container.classList.contains('darknUI')) {
    container.classList.remove('darknUI');
    setPref(false);
  } else {
    container.classList.add('darknUI');
    setPref(true);
  }
}

window.onload = () => {
  let intervalCheck = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(intervalCheck);

      const container = document.getElementsByTagName('body')[0],
      darknButton = document.createElement('span'),
      darknText = document.createElement('span');

      darknButton.setAttribute('id', 'darknButton');
      darknButton.setAttribute('class', 'darknButton');

      darknText.setAttribute('class', 'darknText');
      darknText.innerHTML = 'darkn.';

      container.appendChild(darknButton);
      darknButton.appendChild(darknText);

      getPref().then(pref => {
        if (pref.darknUI) {
          document.querySelector('body').classList.add('darknUI');
        } else {
          document.querySelector('body').classList.remove('darknUI');
        }
        document.getElementById('darknButton').onclick = toggleUI;
      });
    }
  }, 10);
}
