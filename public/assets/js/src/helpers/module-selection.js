export const createModuleItem = () => {
    const moduleCount = parseInt($('#module-count').val()) + 1;

    const itemTemplate = `
        <div class="input" id="module-item-${moduleCount}" style="margin-top: 1.4rem;">
            <label for="module-${moduleCount}" id="module-${moduleCount}-label">Module: ${moduleCount}</label>
            <div class="flex flex--a-center">
                <select id="module-${moduleCount}" class="modules__item" style="flex: 1;"></select>
                <svg class="image--icon" style="margin-left: 1rem; fill: #b68c8c;" id="delete-item-${moduleCount}">
                    <use href="#cancel"></use>
                </svg>
            </div>
        </div>
    `;

    const parent = $(`#module-selection-container`);

    $(itemTemplate).appendTo(parent);

    $(`#module-${moduleCount}`).html($(`#module-1`).html())

    $(`#delete-item-${moduleCount}`).on('click', (e) => {
        const itemId = e.currentTarget.id.split('-')[2];

        removeModuleItem(itemId);
    });

    $('#module-count').val(moduleCount);
};

const rename = (itemId, moduleCount) => {
    itemId = parseInt(itemId);

    for (let i = moduleCount; i > itemId; i--) {
        const oldId = i,
            currentId = oldId - 1;

        const item = $(`#module-item-${oldId}`)[0];
        item.id = `module-item-${currentId}`;

        const label = $(`#module-${oldId}-label`)[0];
        $(label).attr('for', `#module-${currentId}`);
        label.id = `module-${currentId}-label`;
        label.innerText = `Module: ${currentId}`;

        const select = $(`#module-${oldId}`)[0];
        select.id = `module-${currentId}`;

        const deleteBtn = $(`#delete-item-${oldId}`);
        deleteBtn[0].id = `delete-item-${currentId}`;

        // remove previous event, because it points to an old id
        deleteBtn.off('click');

        // set new event pointing to current event
        $(deleteBtn).on('click', () => {
            removeModuleItem(currentId);
        });
    }

    $('#module-count').val(moduleCount - 1);
};

export const removeModuleItem = (itemId) => {
    const moduleCount = parseInt($('#module-count').val());

    if (moduleCount == 1)
        return;

    $(`#module-item-${itemId}`).remove();

    rename(itemId, moduleCount);
};