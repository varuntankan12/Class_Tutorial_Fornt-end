document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }
    if (dropZoneElement.querySelector(".circle")) {
        dropZoneElement.querySelector(".circle").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
    } else {
        thumbnailElement.style.backgroundImage = `url("/assets/FilePreview.svg")`;
        thumbnailElement.style.backgroundSize = 'contain';
    }
}


document.getElementById("upload_new").addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('form_container').classList.toggle('hidden-imp');
});

document.getElementById("upload-notes-form").addEventListener('submit', function (event) {
    event.preventDefault();

    let valid = true;
    const fileInput = document.getElementById("file_input");
    const fileInputWarning = document.getElementById("file_input_warning");
    const fileName = document.getElementById("file_name");
    const fileNameWarning = document.getElementById("file_name_warning");
    const fileTopic = document.getElementById("topic_name");
    const fileTopicWarning = document.getElementById("topic_name_warning");

    if (fileName.value.trim() == '') {
        fileNameWarning.textContent = "File Name is required.";
        valid = false;
    }
    else if (fileName.value.includes('-')) {
        fileNameWarning.textContent = "File Name cannot contain '-'.";
        valid = false;
    }
    else {
        fileNameWarning.textContent = "";
    }

    if (fileTopic.value.trim() == '') {
        fileTopicWarning.textContent = "File Name is required.";
        valid = false;
    } else if (fileTopic.value.includes('-')) {
        fileTopicWarning.textContent = "Topic Name cannot contain '-'.";
        valid = false;
    }
    else {
        fileTopicWarning.textContent = "";
    }

    if (fileInput.files.length === 0) {
        fileInputWarning.textContent = "File is required.";
        valid = false;
    } else {
        fileInputWarning.textContent = "";
    }

    if (valid) {
        this.submit();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const changeButtons = document.querySelectorAll('.change-button');

    changeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const noteDiv = button.closest('.note');
            const pTagContent = noteDiv.querySelector('p').innerText;

            // Assuming the format is always "filename - topic"
            const [filename, topic] = pTagContent.split(' - ');

            document.getElementById('file_name').value = filename.trim();
            document.getElementById('topic_name').value = topic.trim();

            document.getElementById("form_container").classList.toggle("hidden-imp");

            // Optionally scroll to the form or focus on the first input
            document.getElementById('file_name').focus();
        });
    });
});
