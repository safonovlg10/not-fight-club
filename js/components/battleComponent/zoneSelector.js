export default function zoneSelector(type = "attack", listSkils, playerHero) {
  const div = document.createElement("div");
  div.classList.add(`${type}-zones`);
  div.innerHTML = `<p>${type === "attack" ? "Attack" : "Protection"} Zones</p>`;

  listSkils[type].forEach((el) => {
    const checkBoxContainer = document.createElement("div");
    checkBoxContainer.classList.add("check-box__container");
    checkBoxContainer.id = `${type === "attack" ? "attack" : "protection"}-${
      el.name
    }`;

    const label = document.createElement("code");
    label.classList.add("check-box--label");
    label.textContent = el.name.toLocaleUpperCase();

    const input = document.createElement("img");
    input.src = "./assets/img/3d-crystal.avif";
    input.classList.add("check-box--img");
    input.alt = "3d-crystal.avif";

    checkBoxContainer.append(type === "attack" ? label : input);
    checkBoxContainer.append(type === "attack" ? input : label);
    div.append(checkBoxContainer);

    checkBoxContainer.addEventListener("click", (e) => {
      const el = e.target.closest(".check-box__container");
      const id = el.id;

      if (playerHero.checkActiveSkill(listSkils, id)) {
        // removeActiveSkillInObj(listSkils, id);
        playerHero.setActiveSkillInObj(listSkils, id);
        toggleActiveClass(el);
      } else {
        const isAddSkills = playerHero.checkCountActiveSkills(listSkils, id);
        if (isAddSkills) {
          toggleActiveClass(el);
          playerHero.setActiveSkillInObj(listSkils, id);
        }
      }

      // console.log(isAddSkills)
      //   if(isAddSkills) {
      // toggleActiveClass(el);
      // setActiveSkillInObj(listSkils, id);
      //     return;
      //   }
      //   removeActiveSkillInObj(listSkils, id);
    });
  });

  return div;
}

function toggleActiveClass(el) {
  el.classList.toggle("check-box--active");
}
