# Created a function for grabing the data and jsonifying it
# Removing the function from app.py because it took to much space and found a better method, I beleive.
# Might delete since I am using pandas .to_sql and to_json which is shorter and quicker


def api():
    # Create a dictionary from the row data and append to a list of all tables
    allTables = []

    # NutrientValue
    allNutrientValues = []
    for nutrientValue in nutrientValues:
        nutrientValueDict = {}
        nutrientValueDict["main_food_description"] = nutrientValue.main_food_description
        nutrientValueDict["food_code"] = nutrientValue.food_code
        nutrientValueDict["wweia_category_description"] = nutrientValue.wweia_category_description
        nutrientValueDict["wweia_category_code"] = nutrientValue.wweia_category_code
        nutrientValueDict["energy_kcal"] = Decimal(nutrientValue.energy_kcal)
        nutrientValueDict["protein_g"] = Decimal(nutrientValue.protein_g)
        nutrientValueDict["carbohydrate_g"] = Decimal(
            nutrientValue.carbohydrate_g)
        nutrientValueDict["sugars_total_g"] = Decimal(
            nutrientValue.sugars_total_g)
        nutrientValueDict["fiber_total_dietary_g"] = Decimal(
            nutrientValue.fiber_total_dietary_g)
        nutrientValueDict["total_fat_g"] = Decimal(nutrientValue.total_fat_g)
        nutrientValueDict["fatty_acids_total_saturated_g"] = Decimal(
            nutrientValue.fatty_acids_total_saturated_g)
        nutrientValueDict["fatty_acids_total_monounsaturated_g"] = Decimal(
            nutrientValue.fatty_acids_total_monounsaturated_g)
        nutrientValueDict["fatty_acids_total_polyunsaturated_g"] = Decimal(
            nutrientValue.fatty_acids_total_polyunsaturated_g)
        nutrientValueDict["cholesterol_mg"] = Decimal(
            nutrientValue.cholesterol_mg)
        nutrientValueDict["retinol_mcg"] = Decimal(nutrientValue.retinol_mcg)
        nutrientValueDict["vitamin_a_rae_mcg_rae"] = Decimal(
            nutrientValue.vitamin_a_rae_mcg_rae)
        nutrientValueDict["carotene_alpha_mcg"] = Decimal(
            nutrientValue.carotene_alpha_mcg)
        nutrientValueDict["carotene_beta_mcg"] = Decimal(
            nutrientValue.carotene_beta_mcg)
        nutrientValueDict["cryptoxanthin_beta_mcg"] = Decimal(
            nutrientValue.cryptoxanthin_beta_mcg)
        nutrientValueDict["lycopene_mcg"] = Decimal(nutrientValue.lycopene_mcg)
        nutrientValueDict["lutein__zeaxanthin_mcg"] = Decimal(
            nutrientValue.lutein__zeaxanthin_mcg)
        nutrientValueDict["thiamin_mg"] = Decimal(nutrientValue.thiamin_mg)
        nutrientValueDict["riboflavin_mg"] = Decimal(
            nutrientValue.riboflavin_mg)
        nutrientValueDict["niacin_mg"] = Decimal(nutrientValue.niacin_mg)
        nutrientValueDict["vitamin_b6_mg"] = Decimal(
            nutrientValue.vitamin_b6_mg)
        nutrientValueDict["folic_acid_mcg"] = Decimal(
            nutrientValue.folic_acid_mcg)
        nutrientValueDict["folate_food_mcg"] = Decimal(
            nutrientValue.folate_food_mcg)
        nutrientValueDict["folate_dfe_mcg_dfe"] = Decimal(
            nutrientValue.folate_dfe_mcg_dfe)
        nutrientValueDict["folate_total_mcg"] = Decimal(
            nutrientValue.folate_total_mcg)
        nutrientValueDict["choline_total_mg"] = Decimal(
            nutrientValue.choline_total_mg)
        nutrientValueDict["vitamin_b12_mcg"] = Decimal(
            nutrientValue.vitamin_b12_mcg)
        nutrientValueDict["vitamin_b12_added_mcg"] = Decimal(
            nutrientValue.vitamin_b12_added_mcg)
        nutrientValueDict["vitamin_c_mg"] = Decimal(nutrientValue.vitamin_c_mg)
        nutrientValueDict["vitamin_d_d2__d3_mcg"] = Decimal(
            nutrientValue.vitamin_d_d2__d3_mcg)
        nutrientValueDict["vitamin_e_alphatocopherol_mg"] = Decimal(
            nutrientValue.vitamin_e_alphatocopherol_mg)
        nutrientValueDict["vitamin_e_added_mg"] = Decimal(
            nutrientValue.vitamin_e_added_mg)
        nutrientValueDict["vitamin_k_phylloquinone_mcg"] = Decimal(
            nutrientValue.vitamin_k_phylloquinone_mcg)
        nutrientValueDict["calcium_mg"] = Decimal(nutrientValue.calcium_mg)
        nutrientValueDict["phosphorus_mg"] = Decimal(
            nutrientValue.phosphorus_mg)
        nutrientValueDict["magnesium_mg"] = Decimal(nutrientValue.magnesium_mg)
        nutrientValueDict["iron_mg"] = Decimal(nutrientValue.iron_mg)
        nutrientValueDict["zinc_mg"] = Decimal(nutrientValue.zinc_mg)
        nutrientValueDict["copper_mg"] = Decimal(nutrientValue.copper_mg)
        nutrientValueDict["selenium_mcg"] = Decimal(nutrientValue.selenium_mcg)
        nutrientValueDict["potassium_mg"] = Decimal(nutrientValue.potassium_mg)
        nutrientValueDict["sodium_mg"] = Decimal(nutrientValue.sodium_mg)
        nutrientValueDict["caffeine_mg"] = Decimal(nutrientValue.caffeine_mg)
        nutrientValueDict["theobromine_mg"] = Decimal(
            nutrientValue.theobromine_mg)
        nutrientValueDict["water_g"] = Decimal(nutrientValue.water_g)
        nutrientValueDict["alcohol_g"] = Decimal(nutrientValue.alcohol_g)
        allNutrientValues.append(nutrientValueDict)
    allTables.append(allNutrientValues)

    # PortionsAndWeights
    allportionsAndWeights = []
    for portionsAndWeight in portionsAndWeights:
        portionsAndWeightsDict = {}
        portionsAndWeightsDict["id_num"] = portionsAndWeight.id_num
        portionsAndWeightsDict["food_code"] = portionsAndWeight.food_code
        portionsAndWeightsDict["main_food_description"] = portionsAndWeight.main_food_description
        portionsAndWeightsDict["wweia_category_code"] = portionsAndWeight.wweia_category_code
        portionsAndWeightsDict["wweia_category_description"] = portionsAndWeight.wweia_category_description
        portionsAndWeightsDict["seq_num"] = portionsAndWeight.seq_num
        portionsAndWeightsDict["portion_description"] = portionsAndWeight.portion_description
        portionsAndWeightsDict["portion_weight_g"] = Decimal(
            portionsAndWeight.portion_weight_g)
        allportionsAndWeights.append(portionsAndWeightsDict)
    allTables.append(allportionsAndWeights)

    # Categories
    allCategory = []
    for category in categories:
        categoryDict = {}
        categoryDict["category_num "] = category.category_num
        categoryDict["category"] = category.category
        allCategory.append(categoryDict)
    allTables.append(allCategory)

    # DescriptionCategory
    allDescriptionCategory = []
    for descriptionCategory in descriptionCategories:
        descriptionCategoryDict = {}
        descriptionCategoryDict["wweia_category_code"] = descriptionCategory.wweia_category_code
        descriptionCategoryDict["category_num"] = descriptionCategory.category_num
        allDescriptionCategory.append(descriptionCategoryDict)
    allTables.append(allDescriptionCategory)

    # DailyValue
    allDailyValue = []
    for dailyValue in dailyValues:
        dailyValueDict = {}
        dailyValueDict["dv_id"] = dailyValue.dv_id
        dailyValueDict["category"] = dailyValue.category
        dailyValueDict["unit"] = dailyValue.unit
        dailyValueDict["value_2000_cal"] = Decimal(dailyValue.value_2000_cal)
        allDailyValue.append(dailyValueDict)
    allTables.append(allDailyValue)

    return jsonify(allTables)
