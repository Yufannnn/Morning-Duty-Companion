// Live UI counters (absentees, appliances, message length).
document.addEventListener("DOMContentLoaded", () => {
  const absentTbody = document.querySelector("#table tbody");
  const applianceTbody = document.querySelector("#appliance_table tbody");
  const absentCountEl = document.getElementById("absent_count");
  const applianceCountEl = document.getElementById("appliance_count");
  const absentEmpty = document.getElementById("absent_empty");
  const applianceEmpty = document.getElementById("appliance_empty");
  const messageEl = document.getElementById("message");
  const messageCountEl = document.getElementById("message_count");
  let prevAbsent = -1;
  let prevAppliance = -1;
  let prevChars = -1;

  function pulse(el) {
    if (!el) return;
    el.classList.remove("mdc-pop");
    // Force reflow so re-adding the class restarts the animation.
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight;
    el.classList.add("mdc-pop");
    window.setTimeout(() => el.classList.remove("mdc-pop"), 260);
  }

  function update() {
    const absentCount = absentTbody ? absentTbody.rows.length : 0;
    const applianceCount = applianceTbody ? applianceTbody.rows.length : 0;
    const chars = messageEl ? messageEl.value.length : 0;

    if (absentCountEl) absentCountEl.textContent = String(absentCount);
    if (applianceCountEl) applianceCountEl.textContent = String(applianceCount);
    if (absentEmpty) absentEmpty.style.display = absentCount === 0 ? "grid" : "none";
    if (applianceEmpty) applianceEmpty.style.display = applianceCount === 0 ? "grid" : "none";
    if (messageCountEl) messageCountEl.textContent = String(chars);

    if (prevAbsent !== -1 && absentCount !== prevAbsent) pulse(absentCountEl);
    if (prevAppliance !== -1 && applianceCount !== prevAppliance) pulse(applianceCountEl);
    if (prevChars !== -1 && chars !== prevChars) pulse(messageCountEl);
    prevAbsent = absentCount;
    prevAppliance = applianceCount;
    prevChars = chars;
  }

  update();

  const obs = new MutationObserver(update);
  if (absentTbody) obs.observe(absentTbody, { childList: true, subtree: false });
  if (applianceTbody) obs.observe(applianceTbody, { childList: true, subtree: false });

  if (messageEl) messageEl.addEventListener("input", update);
});
