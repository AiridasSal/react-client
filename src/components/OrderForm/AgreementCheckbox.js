import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
function AgreementCheckbox() {
    const { t } = useTranslation();
  const [packingRulesAgreed, setPackingRulesAgreed] = useState(false);
  const [transportRulesAgreed, setTransportRulesAgreed] = useState(false);

  const handlePackingCheckboxChange = (event) => {
    setPackingRulesAgreed(event.target.checked);
  };

  const handleTransportCheckboxChange = (event) => {
    setTransportRulesAgreed(event.target.checked);
  };

  return (
    <div className='AgreementContainer'>
      <label>
        <input
          type="checkbox"
          checked={packingRulesAgreed}
          onChange={handlePackingCheckboxChange}
          required
        />
        {t('Delivery_packing_rules')}
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={transportRulesAgreed}
          onChange={handleTransportCheckboxChange}
          required
        />
        {t('Delivery_rules')}
      </label>
    </div>
  );
}

export default AgreementCheckbox;
