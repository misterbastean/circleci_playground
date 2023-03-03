$(document).ready(function() {
  ingredientCount++;
  $('#addIngredientButton').on('click', function() {
    let ingredientHtml = `<div class="row" style="margin-top: 5px;">
      <div class="col-md-7">
        <input name="ingredients[` + ingredientCount + `][ingredientName]"" type="text" class="form-control" placeholder="e.g. Cinnamon">
      </div>
      <div class="col-md-2">
        <input name="ingredients[` + ingredientCount + `][ingredientQuantity]" type="text" class="form-control" placeholder='#'>
      </div>
      <div class="col-md-2">
        <select name="ingredients[` + ingredientCount + `][ingredientUnit]" class="form-control" placeholder="unit">
          <optgroup label="Volume">
            <option value="teaspoons">Teaspoon(s)</option>
            <option value="tablespoons">Tablespoon(s)</option>
            <option value="fluidOunce">Fluid Ounce(s)</option>
            <option value="cups">Cup(s)</option>
            <option value="pints">Pint(s)</option>
            <option value="quarts">Quart(s)</option>
            <option value="gallons">Gallons(s)</option>
          </optgroup>
          <optgroup label="Weight">
            <option value="gram">Gram(s)</option>
            <option value="ounce">Ounce(s)</option>
            <option value="pound">Pound(s)</option>
          </optgroup>
          <optgroup label="Misc.">
            <option value="each">Each</option>
            <option value="can">Can(s)</option>
            <option value="package">Package(s)</option>
            <option value="pinch">Pinch(es)</option>
            <option value="toTaste">To Taste</option>
          </optgroup>
        </select>
      </div>
      <div class="col-md-1">
        <div class="btn btn-danger btn-small deleteIngredientButton" id="deleteIngredient` + ingredientCount + `">X</div>
      </div>
    </div>`;
    $('#ingredients-container').append(ingredientHtml);
    ingredientCount += 1;
  });
  $('body').on('click', '.deleteIngredientButton', function() {
    $(this).parent().parent().remove();
  })
});
