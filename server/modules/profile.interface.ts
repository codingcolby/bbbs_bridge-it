export default interface Profile {
  profile_type: number; //  1 = big, 2 = little, 3 = couple
  first_name: null | string;
  last_name: null | string;
  sex: null | number;
  dob_or_age: null | string; // saving DOB for big
  race: null | string;
  address: null | string;
  latitude: null | string;
  longitude: null | string;
  ems: null | string; //  enrollment & matching specialist or case manager
  preference: null | object;
  interest: null | string;
  b_employer: null | string; //  Big specific, null on Little profile
  b_occupation: null | string; //  Big specific, null on Little profile
  b_marital_status: null | string; //  Big specific, null on Little profile
  l_parent: null | string; //  Little specific, null on Big profile
  l_parent_relationship_to_child: null | string; //  Little specific, null on Big profile
}
