function openForm() {
    document.getElementById("repairForm").style.display = "block";
}

function closeForm() {
    document.getElementById("repairForm").style.display = "none";
}

function getCurrentDateTime() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Функція для додавання нового ремонту
function saveRepair(event) {
    event.preventDefault();

    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const licensePlate = document.getElementById("licensePlate").value;
    const issue = document.getElementById("issue").value;
    const notes = null;

    const repairData = {
        make,
        model,
        licensePlate,
        issue,
        createdAt: getCurrentDateTime(), // Додаємо поточну дату та час створення
        notes
    };

    // Отримуємо поточні дані з сховища браузера
    let repairs = [];
    try {
        const storedData = localStorage.getItem("repairs");
        if (storedData) {
            repairs = JSON.parse(storedData);
        }
    } catch (error) {
        console.error("Помилка при отриманні даних з сховища:", error);
    }

    // Додаємо новий ремонт до списку
    repairs.push(repairData);

    // Зберігаємо оновлені дані назад в сховище
    try {
        localStorage.setItem("repairs", JSON.stringify(repairs));
    } catch (error) {
        console.error("Помилка при збереженні даних у сховище:", error);
    }

    // Виводимо оновлені ремонти
    displayRepairs();

    // Закриваємо форму
    closeForm();
}

// Оновлений код для зберігання та відображення ремонтів

// Функція для виведення списку ремонтів
function displayRepairs() {
    const repairTableBody = document.getElementById("repairTableBody");
    repairTableBody.innerHTML = ""; // Очищаємо попередні дані

    // Отримуємо дані з сховища браузера
    let repairs = [];
    try {
        const storedData = localStorage.getItem("repairs");
        if (storedData) {
            repairs = JSON.parse(storedData);
        }
    } catch (error) {
        console.error("Помилка при отриманні даних з сховища:", error);
    }

    // Додаємо ремонти до таблиці
    repairs.forEach((repair, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${repair.make}</td>
            <td>${repair.model}</td>
            <td>${repair.licensePlate}</td>
            <td>${repair.issue}</td>
            <td>${repair.createdAt}</td>
            <td>${repair.notes}</td>
            <td>
                <button onclick="viewDetails('${repair.make}', '${repair.model}', '${repair.licensePlate}', '${repair.issue}', '${repair.notes}', '${repair.createdAt}')">Деталі</button>
                <button onclick="deleteRepair(${index})">Видалити</button>
            </td>
        `;
        repairTableBody.appendChild(row);
    });
}
displayRepairs();

// Функція для видалення ремонту
function deleteRepair(index) {
    // Отримуємо поточні дані з сховища браузера
    let repairs = [];
    try {
        const storedData = localStorage.getItem("repairs");
        if (storedData) {
            repairs = JSON.parse(storedData);
        }
    } catch (error) {
        console.error("Помилка при отриманні даних з сховища:", error);
    }

    // Видаляємо ремонт за вказаним індексом
    if (index >= 0 && index < repairs.length) {
        repairs.splice(index, 1);

        // Зберігаємо оновлені дані назад в сховище
        try {
            localStorage.setItem("repairs", JSON.stringify(repairs));
        } catch (error) {
            console.error("Помилка при збереженні даних у сховище:", error);
        }

        // Виводимо оновлені ремонти
        displayRepairs();
    }
}

// Функція для виведення деталей ремонту
function viewDetails(make, model, licensePlate, issue, notes, createdAt) {
    const detailsBlock = document.getElementById("detailsBlock");
    detailsBlock.style.display = "block";

    const makeDetail = document.getElementById("makeDetail");
    const modelDetail = document.getElementById("modelDetail");
    const licensePlateDetail = document.getElementById("licensePlateDetail");
    const issueDetail = document.getElementById("issueDetail");
    const notesDetail = document.getElementById("notesDetail");
    const dataDetail = document.getElementById("dataDetail");

    makeDetail.value = make;
    modelDetail.value = model;
    licensePlateDetail.value = licensePlate;
    issueDetail.value = issue;
    notesDetail.value = notes;
    dataDetail.value = createdAt;

}

// Функція для закриття блоку деталей
function closeDetails() {
    document.getElementById("detailsBlock").style.display = "none";
}
function saveNotes() {
    const make = document.getElementById("makeDetail").value;
    const model = document.getElementById("modelDetail").value;
    const licensePlate = document.getElementById("licensePlateDetail").value;
    const issue = document.getElementById("issueDetail").value;
    const createdAt = document.getElementById("dataDetail").value;
    const notes = document.getElementById("notesDetail").value;

    // Оновлюємо дані в локальному сховищі
    const detailsData = {
        make,
        model,
        licensePlate,
        issue,
        createdAt,
        notes
    };

    try {
        const storedData = localStorage.getItem("repairs");
        let detailsArray = storedData ? JSON.parse(storedData) : [];

        // Замінюємо дані в локальному масиві для вибраного рядка
        const selectedIndex = detailsArray.findIndex(item => item.licensePlate === licensePlate);
        if (selectedIndex !== -1) {
            detailsArray[selectedIndex] = detailsData;

            // Зберігаємо оновлені дані назад в локальному сховищі
            localStorage.setItem("repairs", JSON.stringify(detailsArray));
        }
    } catch (error) {
        console.error("Помилка при збереженні даних у локальному сховищі:", error);
    }

    // Оновлюємо дані в блоку деталей
    document.getElementById("makeDetail").value = make;
    document.getElementById("modelDetail").value = model;
    document.getElementById("licensePlateDetail").value = licensePlate;
    document.getElementById("issueDetail").value = issue;
    document.getElementById("dataDetail").value = createdAt;
    document.getElementById("notesDetail").value = notes;
    displayRepairs();

}
