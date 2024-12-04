// import React from "react";
// import { TouchableOpacity, Text } from "react-native";

// const MenuItem = ({ label, isSelected, onPress }) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       className={`w-1/4 h-12 rounded-xl items-center justify-center ${
//         isSelected ? "bg-[#3e84d6] shadow-md" : "bg-transparent"
//       }`}
//     >
//       <Text
//         className={`font-semibold ${
//           isSelected
//             ? "text-white text-xl"
//             : "text-[#04364A] text-lg"
//         }`}
//       >
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default MenuItem;


import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const MenuItem = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: isSelected ? '#3e84d6' : 'transparent',
        width: '25%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
      }}
    >
      <Text style={{ 
        color: isSelected ? 'white' : '#04364A',
        fontSize: isSelected ? 20 : 18,
        lineHeight: '28',
        fontWeight: '600',

        
      }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
