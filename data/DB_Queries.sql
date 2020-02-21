SELECT * FROM nutrientvalue;
SELECT * FROM portionsandweights;
SELECT * FROM descriptioncategory;
SELECT * FROM category;
SELECT * FROM dailyvalue;


-- Limiting our results to a few so our api is not slow
SELECT food_code, main_food_description, wweia_category_code, wweia_category_description, energy_kcal, protein_g, carbohydrate_g, sugars_total_g, fiber_total_dietary_g, total_fat_g, fatty_acids_total_saturated_g, fatty_acids_total_monounsaturated_g, fatty_acids_total_polyunsaturated_g, cholesterol_mg, retinol_mcg, vitamin_a_rae_mcg_rae, carotene_alpha_mcg, carotene_beta_mcg, cryptoxanthin_beta_mcg, lycopene_mcg, lutein__zeaxanthin_mcg, thiamin_mg, riboflavin_mg, niacin_mg, vitamin_b6_mg, folic_acid_mcg, folate_food_mcg, folate_dfe_mcg_dfe, folate_total_mcg, choline_total_mg, vitamin_b12_mcg, vitamin_b12_added_mcg, vitamin_c_mg, vitamin_d_d2__d3_mcg, vitamin_e_alphatocopherol_mg, vitamin_e_added_mg, vitamin_k_phylloquinone_mcg, calcium_mg, phosphorus_mg, magnesium_mg, iron_mg, zinc_mg, copper_mg, selenium_mcg, potassium_mg, sodium_mg, caffeine_mg, theobromine_mg, alcohol_g, water_g
FROM nutrientvalue
WHERE food_code BETWEEN 11000000 AND 13120120


-- Creating Join table to have nutriants and portion together
SELECT n.food_code, n.main_food_description, p.seq_num,p.portion_description, p.portion_weight_g, n.energy_kcal, n.protein_g, n.carbohydrate_g, n.sugars_total_g, n.fiber_total_dietary_g, n.total_fat_g, n.fatty_acids_total_saturated_g, n.fatty_acids_total_monounsaturated_g, n.fatty_acids_total_polyunsaturated_g, n.cholesterol_mg, n.retinol_mcg, n.vitamin_a_rae_mcg_rae, n.carotene_alpha_mcg, n.carotene_beta_mcg, n.cryptoxanthin_beta_mcg, n.lycopene_mcg, n.lutein__zeaxanthin_mcg, n.thiamin_mg, n.riboflavin_mg, n.niacin_mg, n.vitamin_b6_mg, n.folic_acid_mcg, n.folate_food_mcg, n.folate_dfe_mcg_dfe, n.folate_total_mcg, n.choline_total_mg, n.vitamin_b12_mcg, n.vitamin_b12_added_mcg, n.vitamin_c_mg, n.vitamin_d_d2__d3_mcg, n.vitamin_e_alphatocopherol_mg, n.vitamin_e_added_mg, n.vitamin_k_phylloquinone_mcg, n.calcium_mg, n.phosphorus_mg, n.magnesium_mg, n.iron_mg, n.zinc_mg, n.copper_mg, n.selenium_mcg, n.potassium_mg, n.sodium_mg, n.caffeine_mg, n.theobromine_mg, n.alcohol_g, n.water_g
FROM nutrientvalue AS n 
INNER JOIN portionsandweights AS p
ON n.food_code = p.food_code
WHERE n.food_code BETWEEN 11000000	AND 13120120
ORDER BY main_food_description


-- Category, Portionsandweight and NutrientValue Join
SELECT d.category_num, c.category, d.wweia_category_code, p.wweia_category_description, p.portion_description, p.portion_weight_g, n.energy_kcal, n.protein_g, n.sugars_total_g, n.total_fat_g
FROM nutrientvalue AS n
INNER JOIN portionsandweights AS p
ON n.food_code = p.food_code
INNER JOIN descriptioncategory AS d
ON n.wweia_category_code = d.wweia_category_code
INNER JOIN category AS c
ON d.category_num = c.category_num


-- Category, Portion and Nutrient Join COUNT
SELECT d.category_num, COUNT(*)
FROM nutrientvalue AS n
INNER JOIN descriptioncategory AS d
ON n.wweia_category_code = d.wweia_category_code
GROUP BY d.category_num