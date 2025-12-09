let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .nav');
let header = document.querySelector('.header')

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  // navbar.classList.toggle('active')

  if (navbar.style.visibility == "visible") {
    navbar.style.visibility = "hidden"
  } else {
    navbar.style.visibility = "visible"
  }
}

function handleNavbarVisiblity() {
  window.innerWidth > 768 ? navbar.style.visibility = "visible" : navbar.style.visibility = "hidden";
}
handleNavbarVisiblity()
window.addEventListener("resize", handleNavbarVisiblity())


window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if (window.scrollY > 0) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}

const slides = document.querySelectorAll('.slide');
let index = 0;

// ilk şəkil aktiv olur
slides[index].classList.add('active');

// hər 6 saniyədən bir şəkildən videoya keçid
setInterval(() => {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}, 6000);


// Scroll effekti ilə görünmə animasiyası
const boxes = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', checkBoxes);

function checkBoxes() {
  const triggerBottom = window.innerHeight * 0.85;

  boxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.classList.add('visible');
    } else {
      box.classList.remove('visible');
    }
  });
}
var swiper = new Swiper(".mySwiper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3500, // hər 3.5 saniyədən bir dəyişsin
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

// İlk yükləmədə yoxla
checkBoxes();
document.addEventListener("DOMContentLoaded", function () {

  // Form
  const appointmentForm = document.getElementById('appointmentForm');
  const messageBox = document.getElementById('messageBox');

  document.getElementById("appointmentForm").addEventListener("submit", function (e) {
    e.preventDefault(); // səhifə yenilənməsin

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const date = document.getElementById("date").value.trim();
    const messageBox = document.getElementById("messageBox");

    // Sadə yoxlamalar
    if (!name || !email || !number || !date) {
      messageBox.textContent = "Zəhmət olmasa bütün xanaları doldurun.";
      messageBox.classList.add("error");
      messageBox.style.display = "block";
      return;
    }
    const appointment = { name, email, number, date, time: new Date().toLocaleString() };

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    console.log("Yeni qəbula yazılma:", appointment);
    console.log("Bütün qəbula yazılmalar:", appointments);
    // Əgər hər şey qaydasındadırsa:
    messageBox.textContent = "✅ Təşəkkürlər, müraciətiniz qeydə alındı!";
    messageBox.classList.remove("error");
    messageBox.style.display = "block";

    // Formu təmizləyir
    document.getElementById("appointmentForm").reset();

    // 3 saniyədən sonra mesaj itir
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 30000);
  });


  // const scrollBtn = document.getElementById("scrollToTopBtn");

  // window.addEventListener("scroll", () => {
  //   if (window.scrollY > 400) {
  //     scrollBtn.style.display = "block";
  //   } else {
  //     scrollBtn.style.display = "none";
  //   }
  // });

  // scrollBtn.addEventListener("click", () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth"
  //   });
  // });

  // Section scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 50;
      const sectionHeight = section.offsetHeight;

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        section.classList.add('active-section');
      } else {
        section.classList.remove('active-section');
      }
    });
  });

  // Scroll to top
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  };
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Show localStorage in console
  console.log("LocalStorage-dakı qəbula yazılmalar:", JSON.parse(localStorage.getItem('appointments')) || []);
});