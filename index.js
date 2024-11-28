const bookmarkForm = document.getElementById('bookmarkForm');
const siteTitleInput = document.getElementById('siteName');
const siteURLInput = document.getElementById('siteURL');
const bookmarkList = document.getElementById('bookmarkList');

let bookmarks = [];

bookmarkForm.setAttribute('novalidate', true);


window.addEventListener('DOMContentLoaded', function () {
  const savedBookmarks = localStorage.getItem('bookmarks');
  if (savedBookmarks) {
    bookmarks = JSON.parse(savedBookmarks);
    renderBookmarks();
  }
});


bookmarkForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const siteName = siteTitleInput.value.trim();
  const siteURL = siteURLInput.value.trim();

  if (addBookmark(siteName, siteURL)) {
    siteTitleInput.value = '';
    siteURLInput.value = '';
    resetValidationStates(siteTitleInput);
    resetValidationStates(siteURLInput);
  }
});

function isValidURL(url) {
  const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}


function addBookmark(name, url) {
  if (!name || !url) {
    showAlert();
    return false;
  }

  if (name.length < 3) {
    showAlert();
    return false;
  }

  if (!isValidURL(url)) {
    showAlert();
    return false;
  }


  const isDuplicate = bookmarks.some(bookmark =>
    bookmark.name.toLowerCase() === name.toLowerCase() || bookmark.url.toLowerCase() === url.toLowerCase()
  );

 
  if (isDuplicate) {
    return false;
  }

  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  bookmarks.push({ name: formattedName, url });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  renderBookmarks();

  return true;
}

function resetValidationStates(input) {
  input.classList.remove('invalid', 'valid');
  input.style.boxShadow = '';
  input.style.border = '';
  input.setCustomValidity('');

  const label = input.previousElementSibling;
  const iconValid = label.querySelector('.valid-icon');
  const iconInvalid = label.querySelector('.invalid-icon');

  if (iconValid) iconValid.style.display = 'none';
  if (iconInvalid) iconInvalid.style.display = 'none';
}

// Function to display alert
function showAlert() {
  Swal.fire({
    title: `
      <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 0;">
        <div style="position: absolute; top: 20px; left: 20px; display: flex; gap: 6px;">
          <div style="width: 20px; height: 20px; background-color: #ff605c; border-radius: 50%;"></div>
          <div style="width: 20px; height: 20px; background-color: #ffbd44; border-radius: 50%;"></div>
          <div style="width: 20px; height: 20px; background-color: #00ca4e; border-radius: 50%;"></div>
        </div>
        <h2 style="font-family: 'Bree Serif', serif; font-size: 20px; font-weight: 400; color: #3d3d3d; text-align: left; margin-left: 20px; padding-top: 0;">
          Site Name or Url is not valid, Please follow the rules below :
        </h2>
      </div>
    `,
    html: `
      <div style="font-family: 'PT Sans Caption', sans-serif; font-size: 18px; color: black; text-align: left; margin-top:0px;">
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <div style="width: 30px; height: 30px; border: 3px solid #BB4120; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
            <div style="width: 0; height: 0; border-left: 10px solid #BB4120; border-top: 6px solid transparent; border-bottom: 6px solid transparent;"></div>
          </div>
          <span style="margin-left: 10px;">Site name must contain at least 3 characters</span>
        </div>
        <div style="display: flex; align-items: center;">
          <div style="width: 30px; height: 30px; border: 3px solid #BB4120; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
            <div style="width: 0; height: 0; border-left: 10px solid #BB4120; border-top: 6px solid transparent; border-bottom: 6px solid transparent;"></div>
          </div>
          <span style="margin-left: 10px;">Site URL must be a valid one</span>
        </div>
      </div>
    `,
    icon: 'error',
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
      closeButton: 'swal2-close'
    },
    backdrop: 'rgba(0,0,0,0.5)',
    width: '450px',
    padding: '10px',
    didOpen: () => {
      const closeButton = document.querySelector('.swal2-close');
      if (closeButton) {
        closeButton.style.color = 'black';
      }
    }
  });
}


function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  renderBookmarks();
}


function renderBookmarks() {
  bookmarkList.innerHTML = '';
  bookmarks.forEach((bookmark, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${bookmark.name}</td>
      <td>
        <a href="${bookmark.url}" class="visit-btn" target="_blank">
          <i class="fa-solid fa-eye"></i> Visit
        </a>
      </td>
      <td>
        <button class="delete-btn" onclick="deleteBookmark(${index})">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    `;
    bookmarkList.appendChild(row);
  });
}


siteTitleInput.addEventListener('input', () => validateInput(siteTitleInput));
siteURLInput.addEventListener('input', () => validateInput(siteURLInput));


function validateInput(input) {
  const label = input.previousElementSibling;
  const iconValid = label.querySelector('.valid-icon');
  const iconInvalid = label.querySelector('.invalid-icon');

  if (input === siteTitleInput) {
    if (input.value.trim().length >= 3) {
      input.classList.add('valid');
      input.classList.remove('invalid');
      iconValid.style.display = 'inline';
      iconInvalid.style.display = 'none';
    } else {
      input.classList.add('invalid');
      input.classList.remove('valid');
      iconValid.style.display = 'none';
      iconInvalid.style.display = 'inline';
    }
  } else if (input === siteURLInput) {
    if (isValidURL(input.value)) {
      input.classList.add('valid');
      input.classList.remove('invalid');
      iconValid.style.display = 'inline';
      iconInvalid.style.display = 'none';
    } else {
      input.classList.add('invalid');
      input.classList.remove('valid');
      iconValid.style.display = 'none';
      iconInvalid.style.display = 'inline';
    }
  }
}
