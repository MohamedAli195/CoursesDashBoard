

export interface ISelectCategory {
  id: number;
  nameAr: string;
  nameEn: string;
  imageUrl: string;
  descriptionAr: string;
  descriptionEn: string;
  // price: string;
}

export interface ICategory {
  id: number;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  //   price: string;
  image: FileList | string;
}



//package done

export interface IPackageSelected {
  id: number;
  nameAr: string;
  nameEn: string;
  price: string;
  imageUrl: string;
  status: string | null;
}

export interface IPackage {
  id: number;
  name: { en: string; ar: string };
  price: string;
  image: string | null | FileList;
  status: string | null  ;
}


export interface ICourseSelect {
    id: number;
    nameAr: string;
    nameEn: string;
    price: string;
    imageUrl: string;
    status: string | null;
    category: {
      id: number;
      name: {
        ar: string;
        en: string;
      };
    };
    package: {
      id: number;
      name: {
        ar: string;
        en: string;
      };
    };
    description: {
      en: string;
      ar: string;
    };
  }
  export interface ICourse {
    id: number;
    name: { en: string; ar: string };
    price: string;
    image: string;
    status: string | null;
    category: {
      id: number;
      name: {
        ar: string;
        en: string;
      };
    };
    package: {
      id: number;
      name: {
        ar: string;
        en: string;
      };
    };
    description: {
      en: string;
      ar: string;
    };
  }

  export interface IFormInputCourses {
    name: {
      en: string;
      ar: string;
      fr:string;
    };
    image: FileList;
    price: string;
    main_video: string;
    course_duration: string;
    course_level: string;
    course_lang: string;
    price_after_discount: string;
    package_id: number;
    category_id: number;
    description: {
      en: string;
      ar: string;
      fr:string;
    };
  }