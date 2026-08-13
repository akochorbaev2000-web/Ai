document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       ЭЛЕМЕНТЫ
    ================================================== */

    const letterScreen =
        document.getElementById("letterScreen");

    const letter =
        document.querySelector(".letter");

    const openLetter =
        document.getElementById("openLetter");

    const music =
        document.getElementById("music");

    const petalsContainer =
        document.getElementById("petalsContainer");


    /* ==================================================
       МУЗЫКА
    ================================================== */

    function startMusic() {

        if (!music) {
            return;
        }

        music.volume = 0.45;

        const playPromise =
            music.play();

        if (playPromise !== undefined) {

            playPromise.catch(() => {

                /*
                 * Браузер может заблокировать
                 * autoplay.
                 *
                 * Но поскольку функция вызывается
                 * непосредственно после нажатия
                 * пользователя, музыка должна
                 * запускаться на большинстве
                 * устройств.
                 */

                console.log(
                    "Музыка ожидает разрешения браузера."
                );

            });

        }

    }


    /* ==================================================
       ЛЕПЕСТКИ
    ================================================== */

    function createPetal() {

        if (!petalsContainer) {
            return;
        }

        const petal =
            document.createElement("div");

        petal.classList.add("petal");


        /* примерно половина — розы,
           половина — сакура */

        if (Math.random() > 0.5) {

            petal.classList.add("rose");

        } else {

            petal.classList.add("sakura");

        }


        const size =
            Math.random() * 7 + 7;

        petal.style.width =
            `${size}px`;

        petal.style.height =
            `${size * 1.35}px`;


        petal.style.left =
            `${Math.random() * 100}%`;


        const duration =
            Math.random() * 7 + 8;

        petal.style.animationDuration =
            `${duration}s, ${Math.random() * 2 + 2.5}s`;


        petal.style.animationDelay =
            `${Math.random() * 2}s`;


        petal.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        petalsContainer.appendChild(petal);


        setTimeout(() => {

            petal.remove();

        }, (duration + 3) * 1000);

    }


    function startPetals() {

        if (!petalsContainer) {
            return;
        }


        /*
         * Сначала создаём несколько,
         * чтобы эффект был виден сразу.
         */

        for (let i = 0; i < 12; i++) {

            setTimeout(
                createPetal,
                i * 250
            );

        }


        /*
         * Затем продолжаем добавлять
         * новые лепестки.
         */

        setInterval(
            createPetal,
            650
        );

    }


    /* ==================================================
       ОТКРЫТИЕ ПРИГЛАШЕНИЯ
    ================================================== */

    if (
        letterScreen &&
        letter &&
        openLetter
    ) {

        openLetter.addEventListener(
            "click",
            () => {

                if (
                    letter.classList.contains(
                        "opened"
                    )
                ) {

                    return;

                }


                /*
                 * Музыка запускается
                 * именно по нажатию пользователя.
                 */

                startMusic();


                /*
                 * Запускаем лепестки.
                 */

                startPetals();


                /*
                 * Запускаем переворот карточки.
                 */

                letter.classList.add(
                    "opened"
                );

                document.body.classList.add(
                    "letter-open"
                );


                /*
                 * После завершения анимации
                 * убираем стартовый экран.
                 */

                setTimeout(() => {

                    letterScreen.classList.add(
                        "hidden"
                    );

                    document.body.classList.remove(
                        "letter-open"
                    );


                    window.scrollTo({
                        top: 0,
                        behavior: "auto"
                    });

                }, 1800);

            }
        );

    }


    /* ==================================================
       COUNTDOWN
    ================================================== */

    /*
     * 16 октября 2026 года
     * 12:00
     * Кыргызстан UTC+6
     */

    const weddingDate =
        new Date(
            "2026-10-16T12:00:00+06:00"
        ).getTime();


    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    function updateCountdown() {

        if (
            !days ||
            !hours ||
            !minutes ||
            !seconds
        ) {

            return;

        }


        const now =
            Date.now();


        const distance =
            weddingDate - now;


        if (distance <= 0) {

            days.textContent = "00";

            hours.textContent = "00";

            minutes.textContent = "00";

            seconds.textContent = "00";

            return;

        }


        const d =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const h =
            Math.floor(
                (
                    distance /
                    (1000 * 60 * 60)
                ) % 24
            );


        const m =
            Math.floor(
                (
                    distance /
                    (1000 * 60)
                ) % 60
            );


        const s =
            Math.floor(
                (
                    distance /
                    1000
                ) % 60
            );


        days.textContent =
            String(d).padStart(2, "0");


        hours.textContent =
            String(h).padStart(2, "0");


        minutes.textContent =
            String(m).padStart(2, "0");


        seconds.textContent =
            String(s).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* ==================================================
       КАРТА
    ================================================== */

    const mapButton =
        document.getElementById("mapButton");


    if (mapButton) {

        mapButton.addEventListener(
            "click",
            () => {

                /*
                 * Поиск адреса в Яндекс Картах.
                 */

                const address =
                    encodeURIComponent(
                        "Кыргызстан, Чуйская область, Григорьевка, Ленин көчөсү 33"
                    );


                window.open(
                    `https://yandex.ru/maps/?text=${address}`,
                    "_blank"
                );

            }
        );

    }


    /* ==================================================
       IMAGE LOADING
    ================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach((image) => {

        if (image.complete) {

            image.classList.add(
                "loaded"
            );

        } else {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "loaded"
                    );

                }
            );

        }

    });

});
