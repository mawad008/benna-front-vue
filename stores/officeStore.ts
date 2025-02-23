import { defineStore } from 'pinia';

export const useOfficeStore = defineStore('office', {
  state: () => ({
    selectedOffice: 'main',
    offices: {
      main: {
        name: 'الإدارة الرئيسية',
        address: 'شارع الملك عبد العزيز، مقابل البنك العربي الوطني، الخبر، المنطقة الشرقية، المملكة العربية السعودية، 31952',
        workingHours: 'من الساعة 9 صباحًا وحتى الساعة 10 مساءً',
        phone1: '00966599781111',
        fax: '0138980075',
        email: 'INFO@BENAA.ORG.SA',
      },
      dammam: {
        name: 'مكتب الدمام',
        address: 'العنوان: شارع الملك فهد، الدمام، المنطقة الشرقية، المملكة العربية السعودية',
        workingHours: 'من الساعة 8 صباحًا وحتى الساعة 9 مساءً',
        phone1: '00966551234567',
        fax: '0138009001',
        email: 'dammam@benaa.org.sa',
      },
      office22: {
        name: 'مكتب 22',
        address: 'العنوان: حي العزيزية، الرياض، المملكة العربية السعودية',
        workingHours: 'من الساعة 10 صباحًا وحتى الساعة 8 مساءً',
        phone1: '00966556667788',
        fax: '0138990011',
        email: 'office22@benaa.org.sa',
      },
      branchRiyadh: {
        name: 'فرع الرياض',
        address: 'العنوان: شارع العليا، الرياض، المملكة العربية السعودية',
        workingHours: 'من الساعة 9 صباحًا وحتى الساعة 6 مساءً',
        phone1: '00966559998877',
        fax: '0138123456',
        email: 'riyadh@benaa.org.sa',
      },
      branchQatif: {
        name: 'فرع القطيف',
        address: 'العنوان: شارع الكورنيش، القطيف، المملكة العربية السعودية',
        workingHours: 'من الساعة 10 صباحًا وحتى الساعة 5 مساءً',
        phone1: '00966554443322',
        fax: '0138990073',
        email: 'qatif@benaa.org.sa',
      }
    }
  }),
  actions: {
    setOffice(officeKey: string) {
      this.selectedOffice = officeKey;
    }
  }
});
