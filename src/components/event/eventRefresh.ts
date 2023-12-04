chrome.storage.sync.get('utilsActive')
  .then(res => {
    if (res.utilsActive.refreshEvent) {
      let key: string = window.location.toString().match(/&nr=(\d+)/)?.[1] || '0';

      const setLocal = () => {
        chrome.storage.local.set({ [key + '_history']: true })
          .catch(err => console.log(err));
      }

      window.addEventListener('beforeunload', setLocal);

      chrome.storage.local.get([key + '_history'])
        .then(res => {
          if (res[key + '_history']) {
            window.location.reload();
            chrome.storage.local.remove([key + '_history']);
          }
        })

    }
  })
  .catch(err => console.log(err));
