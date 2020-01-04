export default {
  titles: {
    navbar: 'شبکه تندرستی',
    sidebar: 'پنل مدیریت'
  },
  labels: {
    settings: 'تنظیمات',
    dark: 'حالت شب',
    search: 'جستجو',
    sidebar: {
      users: 'مدیریت کاربران',
      specialties: 'مدیریت تخصص ها',
      categories: 'مدیریت دسته بندی ها',
      topics: 'مطالب ارسال شده',
      questions: 'مدیریت سوالات'
    },
    enums: {
      user: 'کاربر عادی',
      admin: 'ادمین',
      doctor: 'مشاور',
      author: 'نویسنده',
      article: 'مقاله',
      book: 'کتاب',
      news: 'اخبار',
      active: 'فعال',
      deactive: 'غیر فعال',
      pending: 'در حال انتظار',
      busy: 'مشغول',
      banned: 'ممنوع شده',
      male: 'مذکر',
      female: 'مونث',
      familyRelations: {
        '1': 'خودم',
        '2': 'پدر',
        '3': 'مادر',
        '4': 'خواهر',
        '5': 'برادر',
        '6': 'عمو/دایی',
        '7': 'عمه/خاله',
        '8': 'پدربزرگ',
        '9': 'مادربزرگ'
      }
    },
    tooltips: {
      editBtn: 'ویرایش',
      removeBtn: 'حذف'
    }
  },
  pages: {
    login: {
      pageTitle: 'ورود به پنل مدیریت',
      pageSubtitle: 'شبکه تندرستی'
    },
    users: {
      doctors: {
        tabTitle: 'مدیریت مشاوران و پزشکان',
        addBtnLabel: 'افزودن مشاور'
      },
      authors: {
        tabTitle: 'مدیریت نویسندگان',
        addBtnLabel: 'افزودن نویسنده'
      }
    },
    specialties: {
      pageTitle: 'مدیریت تخصص ها',
      addBtnLabel: 'افزودن تخصص',
      addModalTitle: 'افزودن تخصص جدید'
    },
    categories: {
      pageTitle: 'مدیریت دسته بندی ها',
      addBtnLabel: 'افزودن دسته بندی',
      addModalTitle: 'افزودن دسته بندی جدید'
    },
    topics: {
      pageTitle: 'مدیریت مطالب ارسال شده'
    },
    questions: {
      pageTitle: 'مدیریت گروه های سوالی و سوالات',
      addBtnLabel: 'افزودن گروه سوالی',
      addModalTitle: 'افزودن گروه سوالی جدید'
    }
  },
  forms: {
    loginBtn: 'ورود',
    submitBtn: 'ثبت',
    resetBtn: 'پاک کردن فرم',
    login: {
      username: 'نام کاربری',
      password: 'گذرواژه',
      hint: {
        username: 'ایمیل یا شماره موبایل شما برای ورود به پنل'
      }
    },
    specialties: {
      name: 'نام تخصص',
      img: 'آیکن تخصص'
    },
    categories: {
      title: 'عنوان دسته بندی',
      type: 'نوع دسته بندی'
    }
  },
  validations: {
    login: {
      username: 'لطفا ایمیل یا شماره موبایل خود را وارد نمائید',
      password: 'لطفا گذرواژه خود را وارد نمائید'
    },
    specialties: {
      name: 'فیلد نام تخصص اجباری است',
      img: 'فیلد آیکون تخصص اجباری است'
    },
    categories: {
      title: 'فیلد عنوان دسته بندی اجباری است'
    }
  }
};
