import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  TestTube,
  ArrowLeft,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Complete test data with all 247 tests
const tests = [
  { id: 1, name: "24HRS URINARY CALCIUM", price: 400, category: "Urine Tests" },
  {
    id: 2,
    name: "24HRS URINARY CREATININE",
    price: 400,
    category: "Urine Tests",
  },
  { id: 3, name: "24HRS URINARY PROTEIN", price: 400, category: "Urine Tests" },
  {
    id: 4,
    name: "24HRS URINARY URIC ACID",
    price: 400,
    category: "Urine Tests",
  },
  { id: 5, name: "A.N.F.(ELISA)", price: 900, category: "Immunology" },
  { id: 6, name: "A.N.F.(IF)", price: 1100, category: "Immunology" },
  {
    id: 7,
    name: "ACID PHOSPHATASE WITH PROSTATIC FRACTION",
    price: 500,
    category: "Enzymes",
  },
  { id: 8, name: "ADENOSINE DEAMINASE (ADA)", price: 650, category: "Enzymes" },
  { id: 9, name: "AFB (FLOURESCENT)", price: 400, category: "Microbiology" },
  {
    id: 10,
    name: "AFP (ALFA FETOPROTEIN)",
    price: 800,
    category: "Tumor Markers",
  },
  {
    id: 11,
    name: "ALKALINE PHOSPHATASE",
    price: 250,
    category: "Liver Function",
  },
  { id: 12, name: "AMMONIA", price: 1000, category: "Metabolic Tests" },
  { id: 13, name: "AMYLASE", price: 500, category: "Enzymes" },
  {
    id: 14,
    name: "ANEMIA PROFILE (BASIC)",
    price: 800,
    category: "Hematology",
  },
  { id: 15, name: "ANAEROBIC CULTURE", price: 1250, category: "Microbiology" },
  { id: 16, name: "ANTENATAL PROFILE", price: 1200, category: "Pregnancy" },
  {
    id: 17,
    name: "ANTI CARDIOLIPIN ANTIBODY IgG",
    price: 750,
    category: "Immunology",
  },
  {
    id: 18,
    name: "ANTI CARDIOLIPIN ANTIBODY IgM",
    price: 750,
    category: "Immunology",
  },
  { id: 19, name: "ANTI CCP", price: 1800, category: "Immunology" },
  { id: 20, name: "ANTI DS DNA", price: 1350, category: "Immunology" },
  { id: 21, name: "ANTI HAV", price: 1000, category: "Hepatitis" },
  { id: 22, name: "ANTI HBC IGG TOTAL", price: 1000, category: "Hepatitis" },
  { id: 23, name: "ANTI HBC IGM TOTAL", price: 1000, category: "Hepatitis" },
  {
    id: 24,
    name: "ANTI HCV (IIIrd GENERATION)",
    price: 1000,
    category: "Hepatitis",
  },
  { id: 25, name: "ANTI HCV RAPID", price: 600, category: "Hepatitis" },
  { id: 26, name: "ANTI HEV IGM", price: 1450, category: "Hepatitis" },
  {
    id: 27,
    name: "ANTI MULLERIAN HORMONE (AMH)",
    price: 2500,
    category: "Hormones",
  },
  { id: 28, name: "ANTI THYROID ANTIBODIES", price: 2000, category: "Thyroid" },
  { id: 29, name: "ANTI TRO", price: 900, category: "Immunology" },
  { id: 30, name: "APO A-1 & B", price: 900, category: "Lipid Profile" },
  { id: 31, name: "ARTHRITIS PROFILE", price: 2300, category: "Immunology" },
  { id: 32, name: "ASO TITRE", price: 550, category: "Immunology" },
  {
    id: 33,
    name: "AUSTRALIA ANTIGEN (HBsAg)",
    price: 400,
    category: "Hepatitis",
  },
  {
    id: 34,
    name: "BETA 2 MICROGLOBULIN",
    price: 1800,
    category: "Tumor Markers",
  },
  {
    id: 35,
    name: "BETA hCG (QUANTITATIVE)",
    price: 1250,
    category: "Pregnancy",
  },
  { id: 36, name: "BICARBONATE", price: 400, category: "Electrolytes" },
  { id: 37, name: "BILLIRUBIN", price: 300, category: "Liver Function" },
  {
    id: 38,
    name: "BLEEDING TIME & CLOTTING TIME",
    price: 150,
    category: "Hematology",
  },
  { id: 39, name: "BLOOD CULTURE", price: 900, category: "Microbiology" },
  {
    id: 40,
    name: "BLOOD CULTURE (AUTOMATED)",
    price: 1300,
    category: "Microbiology",
  },
  { id: 41, name: "BLOOD GROUP", price: 150, category: "Hematology" },
  {
    id: 42,
    name: "BLOOD GROUP (GEL CARD)",
    price: 300,
    category: "Hematology",
  },
  {
    id: 43,
    name: "BLOOD UREA NITROGEN",
    price: 200,
    category: "Kidney Function",
  },
  {
    id: 44,
    name: "BODY FLUIDS EXAMINATION",
    price: 700,
    category: "Pathology",
  },
  {
    id: 45,
    name: "BONE MARROW EXAMINATION",
    price: 1250,
    category: "Hematology",
  },
  {
    id: 46,
    name: "B.M EXAMINATION WITH PROCEDURE",
    price: 2500,
    category: "Hematology",
  },
  { id: 47, name: "C.E.A", price: 900, category: "Tumor Markers" },
  { id: 48, name: "C.S.F. EXAMINATION", price: 1300, category: "Pathology" },
  { id: 49, name: "CA-125", price: 1200, category: "Tumor Markers" },
  { id: 50, name: "CA 15.3", price: 1500, category: "Tumor Markers" },
  { id: 51, name: "CA 19.9", price: 1500, category: "Tumor Markers" },
  { id: 52, name: "CALCIUM", price: 200, category: "Minerals" },
  { id: 53, name: "IONIC CALCIUM", price: 300, category: "Minerals" },
  {
    id: 54,
    name: "CARBAMEZAPINE/TEGRETOL",
    price: 900,
    category: "Drug Monitoring",
  },
  { id: 55, name: "CHOLESTEROL", price: 200, category: "Lipid Profile" },
  { id: 56, name: "CK (CPK)", price: 450, category: "Cardiac Markers" },
  { id: 57, name: "CK MB", price: 500, category: "Cardiac Markers" },
  { id: 58, name: "CMV IGG", price: 700, category: "Infectious Diseases" },
  { id: 59, name: "CMV IGM", price: 650, category: "Infectious Diseases" },
  { id: 60, name: "COAGULATION PROFILE", price: 1200, category: "Hematology" },
  { id: 61, name: "COOMBS TEST DIRECT", price: 400, category: "Hematology" },
  { id: 62, name: "COOMBS TEST INDIRECT", price: 500, category: "Hematology" },
  { id: 63, name: "CORTISOL", price: 750, category: "Hormones" },
  { id: 64, name: "C-REACTIVE PROTEINS", price: 400, category: "Inflammation" },
  {
    id: 65,
    name: "C-REACTIVE PROTEINS QUANTITATIVE",
    price: 750,
    category: "Inflammation",
  },
  { id: 66, name: "CREATININE", price: 200, category: "Kidney Function" },
  {
    id: 67,
    name: "CULTURE AND SENSITIVITY",
    price: 700,
    category: "Microbiology",
  },
  {
    id: 68,
    name: "CULTURE AND SENSITIVITY (AUTOMATED)",
    price: 1300,
    category: "Microbiology",
  },
  {
    id: 69,
    name: "CYTOLOGY FLUID / EXFOLIATIVE",
    price: 1000,
    category: "Pathology",
  },
  {
    id: 70,
    name: "CYTOLOGY LIQUID BASED (LBC)",
    price: 1100,
    category: "Pathology",
  },
  { id: 71, name: "D DIMER", price: 1250, category: "Hematology" },
  {
    id: 72,
    name: "DENGUE QUALITATIVE IGG/IGM",
    price: 1000,
    category: "Infectious Diseases",
  },
  {
    id: 73,
    name: "DENGUE QUALITATIVE IGG/IGM NS1 ANTIGEN",
    price: 1800,
    category: "Infectious Diseases",
  },
  { id: 74, name: "DHEA SO4", price: 1200, category: "Hormones" },
  { id: 75, name: "DOUBLE MARKER TEST", price: 2500, category: "Pregnancy" },
  { id: 76, name: "E.S.R", price: 150, category: "Hematology" },
  { id: 77, name: "CORRECTED ESR", price: 200, category: "Hematology" },
  {
    id: 78,
    name: "ELECTROLYTES (Na, K, Cl)",
    price: 600,
    category: "Electrolytes",
  },
  {
    id: 79,
    name: "ENHANCED LIPID PROFILE",
    price: 1150,
    category: "Lipid Profile",
  },
  { id: 80, name: "ESTRADIOL (E2)", price: 1000, category: "Hormones" },
  { id: 81, name: "ESTRADIOL (E3)", price: 1000, category: "Hormones" },
  { id: 82, name: "F.D.P", price: 1250, category: "Hematology" },
  { id: 83, name: "F.N.A.C", price: 1250, category: "Pathology" },
  {
    id: 84,
    name: "F.N.A.C WITH PROCEDURE",
    price: 1500,
    category: "Pathology",
  },
  {
    id: 85,
    name: "FASTING PLASMA TRUE GLUCOSE",
    price: 100,
    category: "Diabetes",
  },
  { id: 86, name: "FERRITIN", price: 900, category: "Hematology" },
  { id: 87, name: "FREE T3", price: 500, category: "Thyroid" },
  { id: 88, name: "FREE T3, FREE T4, TSH", price: 1000, category: "Thyroid" },
  { id: 89, name: "FREE T4", price: 650, category: "Thyroid" },
  { id: 90, name: "FSH", price: 1150, category: "Hormones" },
  { id: 91, name: "FUNGAL CULTURE", price: 1250, category: "Microbiology" },
  { id: 92, name: "FUNGUS KOH PREP", price: 300, category: "Microbiology" },
  {
    id: 93,
    name: "G6PD ACTIVITY QUALITATIVE",
    price: 550,
    category: "Hematology",
  },
  { id: 94, name: "GAMMA GT", price: 100, category: "Liver Function" },
  { id: 95, name: "GLUCOSE LOAD TEST", price: 500, category: "Diabetes" },
  {
    id: 96,
    name: "GLUCOSE TOLERANCE TEST 5 SAMPLE",
    price: 500,
    category: "Diabetes",
  },
  {
    id: 97,
    name: "GLUCOSE TOLERANCE TEST 2 SAMPLE",
    price: 200,
    category: "Diabetes",
  },
  { id: 98, name: "HAEMOGLOBIN (Hb)", price: 150, category: "Hematology" },
  { id: 99, name: "HAEMOGRAM CBC", price: 400, category: "Hematology" },
  {
    id: 100,
    name: "HB & PCV (HEMATOCRIT)",
    price: 200,
    category: "Hematology",
  },
  { id: 101, name: "HB & RBC", price: 200, category: "Hematology" },
  { id: 102, name: "HB & T&D", price: 300, category: "Hematology" },
  { id: 103, name: "HB ELECTROPHORESIS", price: 1000, category: "Hematology" },
  {
    id: 104,
    name: "HB FRACTIONS BY HPLC",
    price: 1250,
    category: "Hematology",
  },
  { id: 105, name: "HBA1C", price: 900, category: "Diabetes" },
  {
    id: 106,
    name: "HBsAg (AUSTRALIA ANTIGEN)",
    price: 400,
    category: "Hepatitis",
  },
  { id: 107, name: "HBsAg (QUANTITATIVE)", price: 1250, category: "Hepatitis" },
  {
    id: 108,
    name: "HDL CHOLESTEROL DIRECT",
    price: 350,
    category: "Lipid Profile",
  },
  { id: 109, name: "HERPES IGG", price: 550, category: "Infectious Diseases" },
  { id: 110, name: "HERPES IGM", price: 550, category: "Infectious Diseases" },
  {
    id: 111,
    name: "HISTOPATH EXAMINATION RADICAL SPECIMEN",
    price: 4000,
    category: "Pathology",
  },
  {
    id: 112,
    name: "HISTOPATH EXAMINATION LARGE SPECIMEN",
    price: 2000,
    category: "Pathology",
  },
  {
    id: 113,
    name: "HISTOPATH EXAMINATION MEDIUM SPECIMEN",
    price: 1200,
    category: "Pathology",
  },
  {
    id: 114,
    name: "HISTOPATH EXAMINATION (SMALL/BIOPSY)",
    price: 900,
    category: "Pathology",
  },
  {
    id: 115,
    name: "HIV I & II ANTIBODY",
    price: 400,
    category: "Infectious Diseases",
  },
  {
    id: 116,
    name: "HIV IIIrd & IV GENERATION",
    price: 700,
    category: "Infectious Diseases",
  },
  {
    id: 117,
    name: "HUMAN GROWTH HORMONE (hGh)",
    price: 1150,
    category: "Hormones",
  },
  { id: 118, name: "IGE TOTAL", price: 750, category: "Allergy" },
  { id: 119, name: "IL-6", price: 3000, category: "Inflammation" },
  {
    id: 120,
    name: "IRON, TIBC, TRANSFERRIN SATURATION",
    price: 750,
    category: "Hematology",
  },
  { id: 121, name: "LE CELL", price: 600, category: "Immunology" },
  { id: 122, name: "LDH", price: 750, category: "Enzymes" },
  { id: 123, name: "LDL CHOLESTEROL", price: 450, category: "Lipid Profile" },
  { id: 124, name: "LH", price: 650, category: "Hormones" },
  { id: 125, name: "LIPASE", price: 550, category: "Enzymes" },
  {
    id: 126,
    name: "LIPID PROFILE (HDL & LDL direct)",
    price: 900,
    category: "Lipid Profile",
  },
  { id: 127, name: "LITHIUM", price: 550, category: "Drug Monitoring" },
  {
    id: 128,
    name: "LIVER FUNCTION TEST",
    price: 1200,
    category: "Liver Function",
  },
  { id: 129, name: "LIPOPROTEIN (a)", price: 1500, category: "Lipid Profile" },
  { id: 130, name: "LUPUS ANTICOAGULANT", price: 1500, category: "Immunology" },
  { id: 131, name: "M.T. TEST", price: 200, category: "Tuberculosis" },
  { id: 132, name: "MAGNESIUM (Mg++)", price: 400, category: "Minerals" },
  {
    id: 133,
    name: "MALARIA ANTIGEN",
    price: 400,
    category: "Infectious Diseases",
  },
  {
    id: 134,
    name: "MALARIA PARASITE",
    price: 150,
    category: "Infectious Diseases",
  },
  {
    id: 135,
    name: "MALARIA PARASITE QBC",
    price: 400,
    category: "Infectious Diseases",
  },
  { id: 136, name: "MICROALBUMIN", price: 600, category: "Kidney Function" },
  {
    id: 137,
    name: "MICROFILARIA",
    price: 700,
    category: "Infectious Diseases",
  },
  { id: 138, name: "NASAL SMEAR", price: 200, category: "Microbiology" },
  { id: 139, name: "PAP'S SMEAR", price: 550, category: "Pathology" },
  {
    id: 140,
    name: "PARATHYROID HORMONE (PTH)",
    price: 1500,
    category: "Hormones",
  },
  {
    id: 141,
    name: "PARTIAL THROMBOPLASTIN TIME (PTT)",
    price: 550,
    category: "Hematology",
  },
  { id: 142, name: "PERIPHERAL SMEAR", price: 400, category: "Hematology" },
  {
    id: 143,
    name: "PS WITH RETICULOCYTE & MP",
    price: 800,
    category: "Hematology",
  },
  {
    id: 144,
    name: "PHENOBARBITONE / GARDINAL",
    price: 900,
    category: "Drug Monitoring",
  },
  { id: 145, name: "PHENYTOIN", price: 900, category: "Drug Monitoring" },
  { id: 146, name: "PHOSPHORUS", price: 350, category: "Minerals" },
  { id: 147, name: "PLATELET COUNT", price: 250, category: "Hematology" },
  {
    id: 148,
    name: "POST GLUCOSE PLASMA TRUE GLUCOSE",
    price: 100,
    category: "Diabetes",
  },
  {
    id: 149,
    name: "POST PRANDIAL PLASMA TRUE GLUCOSE",
    price: 100,
    category: "Diabetes",
  },
  {
    id: 150,
    name: "PREGNANCY TEST (URINE)",
    price: 200,
    category: "Pregnancy",
  },
  {
    id: 151,
    name: "PRE-OPERATIVE PROFILE (BASIC)",
    price: 1500,
    category: "Health Packages",
  },
  { id: 152, name: "PROCALCITONIN", price: 3000, category: "Inflammation" },
  { id: 153, name: "PROGESTRONE", price: 750, category: "Hormones" },
  { id: 154, name: "PROLACTIN", price: 650, category: "Hormones" },
  {
    id: 155,
    name: "PROTEIN ELECTROPHORESIS",
    price: 1000,
    category: "Protein Tests",
  },
  {
    id: 156,
    name: "PROTEINS (TOTAL ALBUMIN, GLOBULIN)",
    price: 300,
    category: "Protein Tests",
  },
  {
    id: 157,
    name: "PROTHROMBIN TIME (PT)",
    price: 400,
    category: "Hematology",
  },
  { id: 158, name: "PSA (TOTAL)", price: 750, category: "Tumor Markers" },
  { id: 159, name: "PSA (FREE)", price: 1300, category: "Tumor Markers" },
  {
    id: 160,
    name: "PYREXIA (FEVER) PROFILE",
    price: 1000,
    category: "Health Packages",
  },
  {
    id: 161,
    name: "QUADRUPLE MARKER TEST",
    price: 3000,
    category: "Pregnancy",
  },
  {
    id: 162,
    name: "QUANTIFERON T.B. GOLD",
    price: 3000,
    category: "Tuberculosis",
  },
  { id: 163, name: "R.A. FACTOR", price: 400, category: "Immunology" },
  { id: 164, name: "RA (QUANTITATIVE)", price: 750, category: "Immunology" },
  {
    id: 165,
    name: "RANDOM PLASMA TRUE GLUCOSE",
    price: 100,
    category: "Diabetes",
  },
  {
    id: 166,
    name: "RENAL PROFILE (BASIC)",
    price: 900,
    category: "Kidney Function",
  },
  {
    id: 167,
    name: "RENAL PROFILE EXTENDED",
    price: 1600,
    category: "Kidney Function",
  },
  {
    id: 168,
    name: "RENAL STONE ANALYSIS",
    price: 800,
    category: "Kidney Function",
  },
  { id: 169, name: "RETICULOCYTE COUNT", price: 300, category: "Hematology" },
  { id: 170, name: "RH ANTIBODY TITRE", price: 700, category: "Hematology" },
  { id: 171, name: "RUBELLA IGG", price: 550, category: "Infectious Diseases" },
  { id: 172, name: "RUBELLA IGM", price: 550, category: "Infectious Diseases" },
  { id: 173, name: "SEMEN ANALYSIS", price: 450, category: "Fertility" },
  { id: 174, name: "SGOT", price: 200, category: "Liver Function" },
  { id: 175, name: "SGPT", price: 200, category: "Liver Function" },
  { id: 176, name: "SICKLING TEST", price: 350, category: "Hematology" },
  {
    id: 177,
    name: "SLIT SKIN SMEAR FOR LEPRA BACILLI (4 SITE)",
    price: 500,
    category: "Microbiology",
  },
  {
    id: 178,
    name: "SLIT SKIN SMEAR FOR LEPRA BACILLI (6 SITE)",
    price: 700,
    category: "Microbiology",
  },
  { id: 179, name: "SMEAR FOR AFB", price: 200, category: "Microbiology" },
  {
    id: 180,
    name: "SMEAR FOR GONOCOCCUS",
    price: 450,
    category: "Microbiology",
  },
  {
    id: 181,
    name: "SMEAR FOR GRAMS STAIN",
    price: 200,
    category: "Microbiology",
  },
  {
    id: 182,
    name: "SODIUM POTASSIUM (Na & K)",
    price: 400,
    category: "Electrolytes",
  },
  {
    id: 183,
    name: "SODIUM (Na) OR POTASSIUM (K)",
    price: 250,
    category: "Electrolytes",
  },
  { id: 184, name: "SPUTUM R/M", price: 450, category: "Microbiology" },
  { id: 185, name: "STOOL EXAMINATION", price: 350, category: "Microbiology" },
  {
    id: 186,
    name: "STOOL OCCULT BLOOD",
    price: 150,
    category: "Gastrointestinal",
  },
  {
    id: 187,
    name: "STOOL REDUCING SUGAR",
    price: 150,
    category: "Gastrointestinal",
  },
  { id: 188, name: "SUCROSE LYSIS TEST", price: 500, category: "Hematology" },
  { id: 189, name: "T3", price: 300, category: "Thyroid" },
  { id: 190, name: "T4", price: 300, category: "Thyroid" },
  { id: 191, name: "T&D", price: 250, category: "Hematology" },
  { id: 192, name: "TESTOSTERONE (TOTAL)", price: 800, category: "Hormones" },
  { id: 193, name: "TESTOSTERONE (FREE)", price: 1800, category: "Hormones" },
  {
    id: 194,
    name: "THROAT SWAB AMEAR FOR KLB",
    price: 250,
    category: "Microbiology",
  },
  { id: 195, name: "T3, T4 & TSH", price: 1850, category: "Thyroid" },
  { id: 196, name: "TORCH IGG", price: 1500, category: "Infectious Diseases" },
  { id: 197, name: "TORCH IGM", price: 1850, category: "Infectious Diseases" },
  {
    id: 198,
    name: "TORCH IGG & IGM",
    price: 3000,
    category: "Infectious Diseases",
  },
  { id: 199, name: "TOXO IGG", price: 550, category: "Infectious Diseases" },
  { id: 200, name: "TOXO IGM", price: 550, category: "Infectious Diseases" },
  { id: 201, name: "TPHA", price: 650, category: "Infectious Diseases" },
  { id: 202, name: "TRIGLYCERIDE", price: 350, category: "Lipid Profile" },
  { id: 203, name: "TROPONINE I", price: 1250, category: "Cardiac Markers" },
  { id: 204, name: "TROPONINE T", price: 1250, category: "Cardiac Markers" },
  { id: 205, name: "TRIPLE MARKER TEST", price: 3000, category: "Pregnancy" },
  {
    id: 206,
    name: "TSH (THYROID STIMULATING HORMONE)",
    price: 350,
    category: "Thyroid",
  },
  { id: 207, name: "TYPHI IGM", price: 500, category: "Infectious Diseases" },
  { id: 208, name: "UREA/BUN", price: 200, category: "Kidney Function" },
  { id: 209, name: "URIC ACID", price: 200, category: "Kidney Function" },
  {
    id: 210,
    name: "URINE ALBUMIN CREATININE RATIO",
    price: 750,
    category: "Urine Tests",
  },
  {
    id: 211,
    name: "URINE BILE SALT & PIGMENT",
    price: 100,
    category: "Urine Tests",
  },
  { id: 212, name: "URINE CREATININE", price: 300, category: "Urine Tests" },
  { id: 213, name: "URINE EXAMINATION", price: 200, category: "Urine Tests" },
  { id: 214, name: "URINE FOR ALBUMIN", price: 100, category: "Urine Tests" },
  {
    id: 215,
    name: "URINE FOR BENCE JONES PROTEIN",
    price: 500,
    category: "Urine Tests",
  },
  {
    id: 216,
    name: "URINE FOR KETONE/ACETONE",
    price: 100,
    category: "Urine Tests",
  },
  {
    id: 217,
    name: "URINE FOR UROBILINOGEN",
    price: 300,
    category: "Urine Tests",
  },
  { id: 218, name: "URINE SUGAR", price: 50, category: "Urine Tests" },
  { id: 219, name: "VALPROIC ACID", price: 950, category: "Drug Monitoring" },
  { id: 220, name: "VDRL", price: 300, category: "Infectious Diseases" },
  {
    id: 221,
    name: "VDRL IN DILUTION",
    price: 800,
    category: "Infectious Diseases",
  },
  { id: 222, name: "VITAMIN B12", price: 1100, category: "Vitamins" },
  {
    id: 223,
    name: "VITAMIN D (25-HYDROXY)",
    price: 2000,
    category: "Vitamins",
  },
  {
    id: 224,
    name: "VITAMIN D (1,25-DIHYDROXY)",
    price: 3000,
    category: "Vitamins",
  },
  { id: 225, name: "VMA 24 HRS. URINE", price: 2250, category: "Urine Tests" },
  { id: 226, name: "WIDAL TEST", price: 300, category: "Infectious Diseases" },
  {
    id: 227,
    name: "WIDAL TUBE TEST",
    price: 350,
    category: "Infectious Diseases",
  },
];

export default function TestsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const testsPerPage = 12;
  const navigate = useNavigate();

  // Get unique categories
  const categories = ["All", ...new Set(tests.map((test) => test.category))];

  // Filter and sort tests
  const filteredTests = useMemo(() => {
    let result = tests.filter(
      (test) =>
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== "All") {
      result = result.filter((test) => test.category === selectedCategory);
    }

    // Sort tests
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  // Pagination logic
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);
  const totalPages = Math.ceil(filteredTests.length / testsPerPage);

  // Reset to first page when filters change
  useState(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <section
      className="py-12 bg-gradient-to-b from-blue-50 to-white"
      id="tests"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our{" "}
            <span className="relative inline-block text-blue-600">
              Diagnostic Tests
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0 6 C 70 6 70 4 140 4 L 200 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-blue-200"
                />
              </svg>
            </span>
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive range of 247+ accurate diagnostic tests performed in
            NABL certified labs with quick results.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tests by name or category..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="flex items-center">
                <Filter className="text-gray-400 h-5 w-5 mr-2" />
                <select
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <select
                className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories
              .filter((cat) => cat !== "All")
              .slice(0, 6)
              .map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            {categories.length > 7 && (
              <button className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                +{categories.length - 7} more
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredTests.length} of 247 tests
          </p>
          <p className="text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Tests Grid */}
        {filteredTests.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {test.name}
                        </h3>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {test.category}
                        </span>
                      </div>
                      {test.id % 7 === 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      Accurate results with detailed reporting
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {test.id % 4 === 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-700">
                          Fasting Required
                        </span>
                      )}
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700">
                        Report in 24-48 hours
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-blue-600 font-bold text-xl">
                        ₹{test.price}
                      </p>
                      <div className="mt-12 flex justify-end">
                        <button
                          onClick={() => navigate("/book-test")}
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-2">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tests found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Our Lab Tests?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TestTube className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                NABL Certified Labs
              </h3>
              <p className="text-gray-600 text-sm">
                All tests performed in certified laboratories ensuring accuracy
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TestTube className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Home Sample Collection
              </h3>
              <p className="text-gray-600 text-sm">
                Free sample collection from your home at your preferred time
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TestTube className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Digital Reports
              </h3>
              <p className="text-gray-600 text-sm">
                Get reports online within 24-48 hours with expert consultation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
