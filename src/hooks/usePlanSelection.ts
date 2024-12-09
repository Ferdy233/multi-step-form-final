import { useState } from 'react';
import { Plan } from '../types/plan';
import { Billing } from '../types/billing';

const usePlanSelection = () => {
  const [billingType, setBillingType] = useState<Billing>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<Plan>('arcade');

  const handlePlanChange = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleBillingToggle = () => {
    setBillingType((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'));
  };

  return { billingType, selectedPlan, handlePlanChange, handleBillingToggle };
};

export default usePlanSelection;
