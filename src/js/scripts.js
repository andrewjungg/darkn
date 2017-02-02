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
    chrome.runtime.error;
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

chrome.runtime.sendMessage({}, () => {
  let intervalCheck = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(intervalCheck);

      const container = document.getElementsByTagName('body')[0],
      darknButton = document.createElement('span'),
      darknText = document.createElement('span'),
      bulb = `<div class="container">
        <div class="bulb-light">
          <div id="light"></div>
          <div id="bulb">
            <div class="bulb-top">
              <div class="reflection"></div>
            </div>
            <div class="bulb-middle-1"></div>
            <div class="bulb-bottom"></div>
          </div>
          <div id="base">
            <div class="screw-top"></div>
            <div class="screw-d"></div>
          </div>
        </div>
      </div>`;

      darknButton.setAttribute('id', 'darknButton');
      darknButton.setAttribute('class', 'darknButton');
      darknButton.innerHTML = bulb;

      container.appendChild(darknButton);

      getPref().then(pref => {
        if (pref.darknPref) {
          document.querySelector('body').classList.add('darknUI');
        } else {
          document.querySelector('body').classList.remove('darknUI');
        }
        document.getElementById('darknButton').onclick = toggleUI;
      });
    }
  }, 10);
});
