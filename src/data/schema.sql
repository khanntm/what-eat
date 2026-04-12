-- ============================================================================
-- WHAT-EAT: Supabase Schema (FUTURE — khi cần user accounts)
-- Chỉ chứa data ĐỘNG cần database thật
-- Data TĨNH đã chuyển sang TypeScript files:
--   - micronutrients.ts, superfoods.ts, anti-patterns.ts, recommendations.ts
-- ============================================================================

-- Users (khi enable login)
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE,
    phone           VARCHAR(20),
    display_name    VARCHAR(100),
    age_group       VARCHAR(10) NOT NULL,     -- '18-29', '30-39', etc.
    gender          VARCHAR(10) NOT NULL,     -- 'male', 'female'
    conditions      TEXT[] DEFAULT '{}',      -- HealthConditionId[]
    lifestyle       TEXT[] DEFAULT '{}',      -- LifestyleFlag[]
    concerns        TEXT[] DEFAULT '{}',      -- MicronutrientId[]
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Health metrics (đo định kỳ)
CREATE TABLE user_health_metrics (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    measured_at     TIMESTAMPTZ DEFAULT NOW(),
    weight_kg       DECIMAL(5,1),
    waist_cm        DECIMAL(5,1),
    hip_cm          DECIMAL(5,1),
    systolic_bp     INTEGER,
    diastolic_bp    INTEGER,
    cholesterol_total DECIMAL(5,1),
    fasting_glucose DECIMAL(5,1)
);

-- Symptom test history
CREATE TABLE user_symptom_results (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    test_id         VARCHAR(50) NOT NULL,
    result_code     VARCHAR(50),
    raw_value       VARCHAR(100),
    tested_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Supplement tracking
CREATE TABLE supplement_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    micronutrient_id VARCHAR(50) NOT NULL,
    dosage          VARCHAR(100),
    taken_at        TIMESTAMPTZ DEFAULT NOW(),
    status          VARCHAR(20) DEFAULT 'taken'
);
