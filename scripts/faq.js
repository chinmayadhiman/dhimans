// const accordionItems = document.querySelectorAll(".accordion__item");
// accordionItems.forEach((item) => {
//   const accordionHeader = item.querySelector(".accordion__header");
//   accordionHeader.addEventListener("click", () => {
//     const openItem = document.querySelector(".accordion-open");
//     toggleItem(item);
//     if (openItem && openItem !== item) {
//       toggleItem(openItem);
//     }
//   });
// });
// const toggleItem = (item) => {
//   const accordionContent = item.querySelector(".accordion__content");
//   if (item.classList.contains("accordion-open")) {
//     accordionContent.removeAttribute("style");
//     item.classList.remove("accordion-open");
//   } else {
//     accordionContent.style.height = accordionContent.scrollHeight + "px";
//     item.classList.add("accordion-open");
//   }
// };
const accordionItemHeaders = document.querySelectorAll(
    ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
    accordionItemHeader.addEventListener("click", (event) => {
        // Uncomment in case you only want to allow for the display of only one collapsed item at a time!
        const currentlyActiveAccordionItemHeader = document.querySelector(
            ".accordion-item-header.active"
        );
        if (
            currentlyActiveAccordionItemHeader &&
            currentlyActiveAccordionItemHeader !== accordionItemHeader
        ) {
            currentlyActiveAccordionItemHeader.classList.toggle("active");
            currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
        }
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains("active")) {
            accordionItemBody.style.maxHeight =
                accordionItemBody.scrollHeight + "px";
        } else {
            accordionItemBody.style.maxHeight = 0;
        }
    });
});

