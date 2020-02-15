Drop Table NutrientValue;
Drop Table PortionsAndWeights;
Drop Table Category;
Drop Table DescriptionCategory;

CREATE TABLE NutrientValue (
    food_code int   NOT NULL,
    main_food_description varchar   NOT NULL,
    wweia_category_code int   NOT NULL,
    wweia_category_description varchar   NOT NULL,
    energy_kcal decimal   NOT NULL,
    protein_g decimal   NOT NULL,
    carbohydrate_g decimal   NOT NULL,
    sugars_total_g decimal   NOT NULL,
    fiber_total_dietary_g decimal   NOT NULL,
    total_fat_g decimal   NOT NULL,
    fatty_acids_total_saturated_g decimal   NOT NULL,
    fatty_acids_total_monounsaturated_g decimal   NOT NULL,
    fatty_acids_total_polyunsaturated_g decimal   NOT NULL,
    cholesterol_mg decimal   NOT NULL,
    retinol_mcg decimal   NOT NULL,
    vitamin_a_rae_mcg_rae decimal   NOT NULL,
    carotene_alpha_mcg decimal   NOT NULL,
    carotene_beta_mcg decimal   NOT NULL,
    cryptoxanthin_beta_mcg decimal   NOT NULL,
    lycopene_mcg decimal   NOT NULL,
    lutein__zeaxanthin_mcg decimal   NOT NULL,
    thiamin_mg decimal   NOT NULL,
    riboflavin_mg decimal   NOT NULL,
    niacin_mg decimal   NOT NULL,
    vitamin_b6_mg decimal   NOT NULL,
    folic_acid_mcg decimal   NOT NULL,
    folate_food_mcg decimal   NOT NULL,
    folate_dfe_mcg_dfe decimal   NOT NULL,
    folate_total_mcg decimal   NOT NULL,
    choline_total_mg decimal   NOT NULL,
    vitamin_b12_mcg decimal   NOT NULL,
    vitamin_b12_added_mcg decimal   NOT NULL,
    vitamin_c_mg decimal   NOT NULL,
    vitamin_d_d2__d3_mcg decimal   NOT NULL,
    vitamin_e_alphatocopherol_mg decimal   NOT NULL,
    vitamin_e_added_mg decimal   NOT NULL,
    vitamin_k_phylloquinone_mcg decimal   NOT NULL,
    calcium_mg decimal   NOT NULL,
    phosphorus_mg decimal   NOT NULL,
    magnesium_mg decimal   NOT NULL,
    iron_mg decimal   NOT NULL,
    zinc_mg decimal   NOT NULL,
    copper_mg decimal   NOT NULL,
    selenium_mcg decimal   NOT NULL,
    potassium_mg decimal   NOT NULL,
    sodium_mg decimal   NOT NULL,
    caffeine_mg decimal   NOT NULL,
    theobromine_mg decimal   NOT NULL,
    alcohol_g decimal   NOT NULL,
    water_g decimal   NOT NULL,
    CONSTRAINT pk_NutrientValue PRIMARY KEY (
        food_code
     )
);

CREATE TABLE PortionsAndWeights (
    food_code int   NOT NULL,
    main_food_description varchar   NOT NULL,
    subcode int   NOT NULL,
    subcode_description varchar   NOT NULL,
    wweia_category_code int   NOT NULL,
    wweia_category_description varchar   NOT NULL,
    seq_num decimal   NOT NULL,
    portion_description varchar   NOT NULL,
    portion_weight_g decimal   NOT NULL
);

CREATE TABLE Category (
    category_num int   NOT NULL,
    category varchar   NOT NULL,
    CONSTRAINT pk_Category PRIMARY KEY (
        category_num
     )
);

CREATE TABLE DescriptionCategory (
    wweia_category_code int   NOT NULL,
    category_num int   NOT NULL
);

ALTER TABLE PortionsAndWeights ADD CONSTRAINT fk_PortionsAndWeights_food_code FOREIGN KEY(food_code)
REFERENCES NutrientValue (food_code);

ALTER TABLE PortionsAndWeights ADD CONSTRAINT fk_PortionsAndWeights_wweia_category_code FOREIGN KEY(wweia_category_code)
REFERENCES DescriptionCategory (wweia_category_code);

ALTER TABLE DescriptionCategory ADD CONSTRAINT fk_DescriptionCategory_category_num FOREIGN KEY(category_num)
REFERENCES Category (category_num);

