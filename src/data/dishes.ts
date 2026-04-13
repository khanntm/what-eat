export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: Tag[];
  mealTime: MealTime[];
  dishType: DishType;
  category: Category;
  budget: Budget;
  cookTime: number; // minutes
  ingredients: string[];
  weather: Weather[];
  kidFriendly: boolean;
  vegetarian: boolean;
  source: DishSource;
  superfoodTags?: SuperfoodTag[];      // Siêu thực phẩm có trong món
  cookingWarnings?: CookingWarningId[]; // ID cảnh báo chế biến
  fistfuls?: number;                    // Số nắm tay rau/quả (for rau/canh/fruit dishes)
  healthTips?: string[];                // Mẹo ăn uống đi kèm
}

export type DishType = 'món-mặn' | 'rau' | 'canh' | 'món-chính' | 'ăn-sáng' | 'ăn-vặt';
export type Tag = 'nhanh' | 'rẻ' | 'healthy' | 'gia-đình' | 'no-lâu' | 'tiện' | 'ngon' | 'đặc-biệt';
export type MealTime = 'sáng' | 'trưa' | 'tối';
export type Category = 'cơm' | 'bún-phở' | 'bánh' | 'cháo' | 'lẩu' | 'món-nước' | 'đồ-ăn-nhanh' | 'tráng-miệng' | 'khác';
export type Budget = 'rẻ' | 'vừa' | 'cao';
export type Weather = 'nóng' | 'lạnh' | 'mưa' | 'bình-thường';
export type DishSource = 'nấu-tại-nhà' | 'mua-ngoài' | 'cửa-hàng-tiện-lợi';

export type SuperfoodTag =
  | 'omega3'        // Hạt tía tô, cá hồi, cá thu
  | 'lecithin'      // Trứng chim cút, đậu phụ
  | 'vitamin-e'     // Hạt hướng dương
  | 'zinc-rich'     // Hàu biển, tôm, sò
  | 'fiber-rich'    // Khoai lang, rau xanh
  | 'probiotic'     // Kim chi, sữa chua
  | 'anti-inflammatory' // Nghệ, gừng, tỏi đen
  | 'curcumin';     // Nghệ

export type CookingWarningId =
  | 'lectin-grain'       // Bánh mì nguyên cám, gạo lứt
  | 'lectin-bean-raw'    // Đậu đỗ sống
  | 'lectin-bean-cook'   // Đậu phải hầm kỹ (nồi áp suất)
  | 'lectin-soy-sprout'  // Giá đỗ tương sống
  | 'aflatoxin-leftover' // Thức ăn thừa >3 ngày
  | 'benzopyrene-grill'  // Nướng than/BBQ gây ung thư
  | 'reused-oil'         // Dầu ăn đã qua sử dụng
  | 'oil-high-heat'      // Dầu thực vật chiên rán nhiệt cao
  | 'raw-salad'          // Rau sống miễn dịch yếu
  | 'juice-no-fiber';    // Nước ép mất chất xơ

// Helper to reduce boilerplate
const D = (
  id: string, name: string, desc: string, image: string,
  tags: Tag[], mealTime: MealTime[], dishType: DishType, category: Category,
  budget: Budget, cookTime: number, ingredients: string[],
  weather: Weather[], kidFriendly: boolean, source: DishSource = 'nấu-tại-nhà',
  vegetarian: boolean = false,
  extra?: { sf?: SuperfoodTag[]; cw?: CookingWarningId[]; fist?: number; tips?: string[] }
): Dish => ({ id, name, description: desc, image, tags, mealTime, dishType, category, budget, cookTime, ingredients, weather, kidFriendly, vegetarian, source, ...(extra?.sf && { superfoodTags: extra.sf }), ...(extra?.cw && { cookingWarnings: extra.cw }), ...(extra?.fist && { fistfuls: extra.fist }), ...(extra?.tips && { healthTips: extra.tips }) });

const ALL_WEATHER: Weather[] = ['bình-thường', 'nóng', 'lạnh', 'mưa'];
const COOL: Weather[] = ['lạnh', 'mưa', 'bình-thường'];
const HOT: Weather[] = ['nóng', 'bình-thường'];
const NORMAL: Weather[] = ['bình-thường'];

export const dishes: Dish[] = [

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                    ĂN SÁNG - NẤU NHANH                      ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('trung-chien','Trứng chiên','Trứng chiên đơn giản, nhanh gọn cho buổi sáng','🍳',['nhanh','rẻ','tiện'],['sáng'],'ăn-sáng','khác','rẻ',5,['trứng','dầu ăn','hành lá'],ALL_WEATHER,true),
  D('chao-thit-bam','Cháo thịt bằm','Cháo nóng hổi với thịt bằm, hành phi thơm lừng','🥣',['nhanh','rẻ','no-lâu'],['sáng'],'ăn-sáng','cháo','rẻ',15,['gạo','thịt bằm','hành phi','gừng'],COOL,true),
  D('mi-goi-trung','Mì gói trứng','Mì gói nấu nhanh với trứng và rau','🍜',['nhanh','rẻ','tiện'],['sáng'],'ăn-sáng','bún-phở','rẻ',10,['mì gói','trứng','rau'],COOL,true),
  D('banh-mi-op-la','Bánh mì ốp la','Bánh mì nóng giòn kèm trứng ốp la','🥖',['nhanh','rẻ','tiện'],['sáng'],'ăn-sáng','bánh','rẻ',10,['bánh mì','trứng','xì dầu'],ALL_WEATHER,true),
  D('xoi-dau','Xôi đậu xanh','Xôi đậu xanh nóng hổi, dẻo thơm','🍚',['no-lâu','rẻ'],['sáng'],'ăn-sáng','khác','rẻ',15,['nếp','đậu xanh','hành phi'],COOL,true),
  D('chao-ga','Cháo gà','Cháo gà xé phay, nước dùng ngọt tự nhiên','🥣',['ngon','healthy'],['sáng'],'ăn-sáng','cháo','vừa',15,['gạo','gà','hành phi','gừng','rau mùi'],COOL,true),
  D('bot-chien','Bột chiên','Bột chiên trứng giòn, chấm tương ớt','🍳',['nhanh','ngon'],['sáng'],'ăn-sáng','khác','rẻ',15,['bột gạo','trứng','hành lá'],NORMAL,true),
  D('banh-mi-pate','Bánh mì pate','Bánh mì pate bơ giòn tan, đậm đà kiểu Sài Gòn','🥖',['nhanh','rẻ','ngon'],['sáng'],'ăn-sáng','bánh','rẻ',5,['bánh mì','pate','bơ','chả lụa'],ALL_WEATHER,true),
  D('nui-xao-bo','Nui xào bò','Nui xào bò bằm sốt cà chua, bé yêu thích','🍝',['nhanh','ngon','gia-đình'],['sáng'],'ăn-sáng','khác','rẻ',15,['nui','bò bằm','cà chua','hành tây'],NORMAL,true),
  D('sup-ga-ngo','Súp gà ngô','Súp gà ngô ngọt ấm bụng, dinh dưỡng','🥣',['healthy','gia-đình','nhanh'],['sáng'],'ăn-sáng','cháo','rẻ',15,['gà','ngô ngọt','trứng','hành lá'],COOL,true),
  D('banh-bao','Bánh bao','Bánh bao nhân thịt trứng nóng hổi','🥟',['nhanh','tiện','ngon'],['sáng'],'ăn-sáng','bánh','rẻ',10,['bột mì','thịt bằm','trứng cút'],ALL_WEATHER,true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                    ĂN SÁNG - MUA NGOÀI                      ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('pho-bo','Phở bò','Phở bò truyền thống, nước dùng ngọt xương','🍜',['ngon','no-lâu','đặc-biệt'],['sáng','trưa','tối'],'món-chính','bún-phở','vừa',0,[],COOL,true,'mua-ngoài'),
  D('pho-ga','Phở gà','Phở gà thanh nhẹ, nước trong veo','🍜',['ngon','healthy'],['sáng','trưa'],'món-chính','bún-phở','vừa',0,[],COOL,true,'mua-ngoài'),
  D('hu-tiu-nam-vang','Hủ tiếu Nam Vang','Hủ tiếu nước dùng ngọt thanh, đủ thịt tôm','🍜',['ngon','no-lâu'],['sáng'],'ăn-sáng','bún-phở','vừa',0,[],COOL,true,'mua-ngoài'),
  D('bun-bo-hue','Bún bò Huế','Bún bò cay nồng đặc trưng xứ Huế','🍜',['ngon','no-lâu','đặc-biệt'],['sáng','trưa'],'món-chính','bún-phở','vừa',0,[],COOL,false,'mua-ngoài'),
  D('xoi-man','Xôi mặn','Xôi mặn đầy đủ: trứng, chả, hành phi','🍚',['no-lâu','rẻ','nhanh'],['sáng'],'ăn-sáng','khác','rẻ',0,[],COOL,true,'mua-ngoài'),
  D('banh-mi-thit','Bánh mì thịt','Bánh mì Sài Gòn giòn rụm, nhân đầy ắp','🥖',['nhanh','rẻ','tiện','ngon'],['sáng'],'ăn-sáng','bánh','rẻ',0,[],ALL_WEATHER,true,'mua-ngoài'),
  D('banh-cuon','Bánh cuốn','Bánh cuốn mỏng mềm, nhân thịt nấm mộc nhĩ','🥟',['ngon','đặc-biệt'],['sáng'],'ăn-sáng','bánh','rẻ',0,[],COOL,true,'mua-ngoài'),
  D('bun-moc','Bún mọc','Bún mọc nước dùng trong, giò heo mềm','🍜',['ngon','no-lâu'],['sáng','trưa'],'món-chính','bún-phở','vừa',0,[],COOL,true,'mua-ngoài'),
  D('banh-canh-cua','Bánh canh cua','Bánh canh cua nước sánh, đậm đà','🦀',['ngon','no-lâu','đặc-biệt'],['sáng','trưa'],'món-chính','bún-phở','vừa',0,[],COOL,true,'mua-ngoài'),
  D('bo-kho-banh-mi','Bò kho bánh mì','Bò kho nước dùng sánh, thịt bò mềm, ăn kèm bánh mì','🍲',['ngon','no-lâu'],['sáng'],'ăn-sáng','món-nước','vừa',0,[],COOL,true,'mua-ngoài'),
  D('xoi-ga','Xôi gà','Xôi gà xé phay, hành phi thơm nức','🍚',['ngon','no-lâu'],['sáng'],'ăn-sáng','khác','vừa',0,[],COOL,true,'mua-ngoài'),
  D('hu-tiu-go','Hủ tiếu gõ','Hủ tiếu gõ bình dân, nước dùng ngọt thanh','🍜',['rẻ','ngon'],['sáng','tối'],'ăn-sáng','bún-phở','rẻ',0,[],NORMAL,true,'mua-ngoài'),
  D('bun-rieu-sang','Bún riêu','Bún riêu cua đồng chua ngọt, rau sống đầy đủ','🦀',['ngon','đặc-biệt'],['sáng','trưa'],'món-chính','bún-phở','vừa',0,[],HOT,true,'mua-ngoài'),
  D('bun-mam','Bún mắm','Bún mắm miền Tây đậm đà, tôm cá đầy đủ','🍜',['ngon','đặc-biệt','no-lâu'],['sáng','trưa'],'món-chính','bún-phở','vừa',0,[],NORMAL,true,'mua-ngoài'),
  D('mi-quang','Mì Quảng','Mì Quảng tôm thịt, nước lèo vàng nghệ đặc trưng','🍜',['ngon','đặc-biệt','no-lâu'],['sáng','trưa'],'món-chính','bún-phở','vừa',0,[],NORMAL,true,'mua-ngoài'),
  D('bun-ca','Bún cá','Bún cá nước dùng trong, cá chiên giòn','🐟',['ngon','healthy'],['sáng','trưa'],'món-chính','bún-phở','vừa',0,[],NORMAL,true,'mua-ngoài'),
  D('banh-mi-heo-quay','Bánh mì heo quay','Bánh mì heo quay giòn da, thơm nức','🥖',['ngon','no-lâu'],['sáng'],'ăn-sáng','bánh','vừa',0,[],NORMAL,true,'mua-ngoài'),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                 ĂN SÁNG - CỬA HÀNG TIỆN LỢI                 ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('onigiri','Cơm nắm (Onigiri)','Cơm nắm tiện lợi từ Ministop/GS25','🍙',['nhanh','tiện','rẻ'],['sáng'],'ăn-sáng','khác','rẻ',0,[],ALL_WEATHER,true,'cửa-hàng-tiện-lợi'),
  D('sandwich-tl','Sandwich','Sandwich tươi từ Circle K/GS25','🥪',['nhanh','tiện'],['sáng'],'ăn-sáng','bánh','rẻ',0,[],HOT,true,'cửa-hàng-tiện-lợi'),
  D('sua-banh','Sữa + Bánh ngọt','Combo sữa tươi và bánh ngọt cho bé','🥛',['nhanh','tiện','rẻ'],['sáng'],'ăn-sáng','khác','rẻ',0,[],ALL_WEATHER,true,'cửa-hàng-tiện-lợi'),
  D('mi-y-tl','Mì Ý hâm nóng','Mì Ý hâm nóng từ cửa hàng tiện lợi','🍝',['nhanh','tiện'],['sáng'],'ăn-sáng','khác','rẻ',0,[],ALL_WEATHER,true,'cửa-hàng-tiện-lợi'),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║              MÓN MẶN - THỊT HEO                              ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('thit-kho-trung','Thịt kho trứng','Thịt ba chỉ kho nước dừa với trứng, đậm đà','🥚',['ngon','gia-đình','no-lâu'],['trưa','tối'],'món-mặn','cơm','vừa',45,['thịt ba chỉ','trứng','nước dừa','nước mắm'],COOL,true),
  D('suon-xao-chua-ngot','Sườn xào chua ngọt','Sườn non xào sốt chua ngọt với dứa, ớt chuông','🍖',['ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','vừa',30,['sườn non','cà chua','dứa','hành tây','ớt chuông'],NORMAL,true),
  D('thit-rang-chay-canh','Thịt rang cháy cạnh','Thịt ba chỉ rang cháy cạnh mặn ngọt, cơm tốn lắm','🍖',['ngon','nhanh','gia-đình'],['trưa','tối'],'món-mặn','cơm','vừa',20,['thịt ba chỉ','nước mắm','đường','tỏi'],COOL,true),
  D('thit-luoc','Thịt luộc chấm mắm','Thịt ba chỉ luộc chấm mắm tôm/nước mắm','🥩',['nhanh','gia-đình','healthy'],['trưa','tối'],'món-mặn','cơm','vừa',20,['thịt ba chỉ','mắm tôm','chanh','ớt'],HOT,true),
  D('cha-trung-hap','Chả trứng hấp','Chả trứng hấp mềm mịn, thơm mỡ hành','🥚',['nhanh','gia-đình','rẻ'],['trưa','tối'],'món-mặn','cơm','rẻ',25,['thịt bằm','trứng','mộc nhĩ','miến','hành lá'],COOL,true),
  D('suon-nuong','Sườn nướng','Sườn nướng sả ớt mật ong, thơm lừng','🍖',['ngon','đặc-biệt'],['trưa','tối'],'món-mặn','cơm','vừa',30,['sườn heo','sả','tỏi','mật ong'],NORMAL,true),
  D('thit-kho-tau','Thịt kho tàu','Thịt ba chỉ kho mềm rệu với nước dừa','🍖',['ngon','gia-đình','no-lâu'],['trưa','tối'],'món-mặn','cơm','vừa',60,['thịt ba chỉ','trứng','nước dừa','nước mắm'],COOL,true),
  D('thit-xao-sa-ot','Thịt xào sả ớt','Thịt heo xào sả ớt cay thơm, đưa cơm','🌶️',['nhanh','ngon'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['thịt heo','sả','ớt','hành tây'],COOL,false),
  D('suon-ram-man','Sườn ram mặn','Sườn ram nước mắm mặn ngọt, cơm tốn cả nồi','🍖',['ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','vừa',30,['sườn heo','nước mắm','đường','tỏi'],NORMAL,true),
  D('thit-heo-quay','Thịt heo quay','Heo quay giòn bì, thịt mềm ngọt','🍖',['ngon','đặc-biệt','no-lâu'],['trưa','tối'],'món-mặn','cơm','cao',60,['thịt ba rọi','ngũ vị hương','muối','giấm'],NORMAL,true),
  D('cha-lua','Chả lụa','Chả lụa cắt lát, ăn kèm cơm trắng','🥩',['nhanh','tiện'],['trưa','tối'],'món-mặn','cơm','vừa',0,['chả lụa'],ALL_WEATHER,true),
  D('nem-ran','Nem rán (Chả giò)','Chả giò giòn rụm nhân thịt tôm rau củ','🥟',['ngon','gia-đình','đặc-biệt'],['trưa','tối'],'món-mặn','cơm','vừa',30,['bánh tráng','thịt bằm','tôm','miến','nấm mèo','cà rốt'],NORMAL,true),
  D('thit-nuong-rieng','Thịt nướng riềng mẻ','Thịt nướng ướp riềng mẻ kiểu Bắc','🥩',['ngon','đặc-biệt'],['trưa','tối'],'món-mặn','cơm','vừa',25,['thịt heo','riềng','mẻ','sả'],NORMAL,true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║              MÓN MẶN - GÀ / VỊT                              ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('ga-kho-gung','Gà kho gừng','Gà kho gừng đậm đà, ấm bụng ngày mưa','🍗',['ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','vừa',30,['gà','gừng','nước mắm','đường'],COOL,true),
  D('ga-chien-nuoc-mam','Gà chiên nước mắm','Cánh gà chiên giòn, rim nước mắm tỏi ớt','🍗',['ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','vừa',25,['cánh gà','nước mắm','tỏi','đường'],NORMAL,true),
  D('ga-luoc','Gà luộc','Gà luộc da vàng óng, chấm muối tiêu chanh','🍗',['healthy','gia-đình','đặc-biệt'],['trưa','tối'],'món-mặn','cơm','vừa',30,['gà','lá chanh','muối','tiêu','chanh'],HOT,true),
  D('ga-xao-xa-ot','Gà xào sả ớt','Gà xào sả ớt thơm cay nồng','🍗',['nhanh','ngon'],['trưa','tối'],'món-mặn','cơm','vừa',20,['gà','sả','ớt','hành tây'],COOL,false),
  D('ga-rang-muoi','Gà rang muối','Gà rang muối giòn tan, thơm sả lá chanh','🍗',['ngon','đặc-biệt'],['tối'],'món-mặn','cơm','vừa',30,['gà','muối','sả','lá chanh','ớt'],NORMAL,true),
  D('ga-xao-me','Gà xào me','Gà xào sốt me chua ngọt hấp dẫn','🍗',['ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','vừa',25,['gà','me','đường','tỏi','ớt'],HOT,true),
  D('vit-quay','Vịt quay','Vịt quay da giòn, thịt mềm','🦆',['ngon','đặc-biệt','no-lâu'],['trưa','tối'],'món-mặn','cơm','cao',60,['vịt','ngũ vị hương','mật ong'],NORMAL,true),
  D('ga-nuong-mat-ong','Gà nướng mật ong','Đùi gà nướng mật ong vàng ruộm, thơm ngọt','🍗',['ngon','gia-đình','đặc-biệt'],['tối'],'món-mặn','cơm','vừa',35,['đùi gà','mật ong','tỏi','tiêu','bơ'],NORMAL,true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║              MÓN MẶN - BÒ                                    ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('bo-luc-lac','Bò lúc lắc','Bò xào lúc lắc sốt tiêu đen, ăn kèm cơm nóng','🥩',['ngon','đặc-biệt'],['trưa','tối'],'món-mặn','cơm','cao',15,['bò','ớt chuông','hành tây','tỏi','tiêu'],NORMAL,true),
  D('bo-xao-dau','Bò xào đậu que','Bò xào đậu que bơ tỏi, nhanh gọn','🥩',['nhanh','ngon'],['trưa','tối'],'món-mặn','cơm','vừa',15,['bò','đậu que','tỏi','dầu hào'],NORMAL,true),
  D('bo-xao-hanh-tay','Bò xào hành tây','Bò xào hành tây mềm ngọt, đơn giản mà ngon','🥩',['nhanh','ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','vừa',10,['bò','hành tây','dầu hào','tiêu'],NORMAL,true),
  D('bo-xao-ot-chuong','Bò xào ớt chuông','Bò xào ớt chuông 3 màu, đẹp mắt đủ vitamin','🫑',['nhanh','ngon','healthy'],['trưa','tối'],'món-mặn','cơm','vừa',15,['bò','ớt chuông đỏ','ớt chuông xanh','ớt chuông vàng','hành tây'],NORMAL,true),
  D('bo-xao-cai-thia','Bò xào cải thìa','Bò xào cải thìa mềm ngọt, vừa mặn vừa rau','🥬',['nhanh','healthy'],['trưa','tối'],'món-mặn','cơm','vừa',10,['bò','cải thìa','tỏi','dầu hào'],NORMAL,true),
  D('bo-bit-tet','Bò bít tết','Bò bít tết kiểu Việt với trứng ốp la và khoai','🥩',['ngon','no-lâu','đặc-biệt'],['trưa','tối'],'món-mặn','cơm','cao',20,['bò','trứng','khoai tây','rau cải'],NORMAL,true),
  D('bo-sot-vang','Bò sốt vang','Bò hầm sốt vang đậm đà kiểu Bắc','🍖',['ngon','đặc-biệt','no-lâu'],['tối'],'món-mặn','cơm','cao',90,['bò','cà rốt','khoai tây','rượu vang','hành tây'],COOL,true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║              MÓN MẶN - CÁ / HẢI SẢN                         ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('ca-kho-to','Cá kho tộ','Cá kho tộ đất mặn ngọt đậm đà miền Nam','🐟',['ngon','gia-đình','đặc-biệt'],['trưa','tối'],'món-mặn','cơm','vừa',40,['cá','nước màu','hành','tỏi','ớt','tiêu'],COOL,true),
  D('ca-chien-xu','Cá chiên xù','Cá chiên xù giòn rụm, trẻ em rất thích','🐟',['ngon','nhanh'],['trưa','tối'],'món-mặn','cơm','vừa',20,['cá','bột chiên xù','trứng'],NORMAL,true),
  D('ca-kho-rieng','Cá kho riềng','Cá kho riềng kiểu Bắc, vị mặn đậm','🐟',['ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','rẻ',30,['cá','riềng','nghệ','nước mắm'],COOL,true),
  D('tom-rang-muoi','Tôm rang muối','Tôm rang muối ớt giòn tan, thơm nức mũi','🦐',['ngon','đặc-biệt'],['tối'],'món-mặn','cơm','cao',20,['tôm','muối','ớt','tỏi','lá chanh'],NORMAL,true),
  D('tom-rim','Tôm rim nước mắm','Tôm rim mặn ngọt, cơm tốn cả nồi','🦐',['ngon','nhanh'],['trưa','tối'],'món-mặn','cơm','vừa',15,['tôm','nước mắm','đường','tỏi','ớt'],NORMAL,true),
  D('muc-xao','Mực xào dưa leo','Mực xào dưa leo giòn ngọt, nhanh gọn','🦑',['nhanh','ngon'],['trưa','tối'],'món-mặn','cơm','vừa',10,['mực','dưa leo','tỏi','dầu hào'],HOT,true),
  D('ca-chien-gion','Cá chiên giòn','Cá chiên giòn vàng, chấm nước mắm tỏi ớt','🐟',['nhanh','ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','vừa',15,['cá','bột chiên','nước mắm','tỏi','ớt'],NORMAL,true),
  D('tom-hap-bia','Tôm hấp bia','Tôm hấp bia ngọt thịt, giữ trọn vị tươi','🦐',['ngon','đặc-biệt','healthy'],['tối'],'món-mặn','cơm','cao',15,['tôm','bia','sả','gừng'],NORMAL,true),
  D('ca-hap-hanh','Cá hấp hành gừng','Cá hấp gừng hành thanh đạm, giữ vị ngọt tự nhiên','🐟',['healthy','ngon'],['trưa','tối'],'món-mặn','cơm','vừa',20,['cá','gừng','hành lá','nước tương'],NORMAL,true),
  D('tom-xao-bong-cai','Tôm xào bông cải','Tôm xào bông cải xanh, đẹp mắt giàu dinh dưỡng','🦐',['healthy','ngon','nhanh'],['trưa','tối'],'món-mặn','cơm','vừa',15,['tôm','bông cải xanh','cà rốt','tỏi'],NORMAL,true),
  D('ca-sot-ca-chua','Cá sốt cà chua','Cá chiên sốt cà chua ngọt dịu, trẻ em thích','🐟',['ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','vừa',20,['cá','cà chua','hành tây','đường','giấm'],NORMAL,true),
  D('muc-nhoi-thit','Mực nhồi thịt','Mực nhồi thịt bằm hấp, thanh ngọt','🦑',['ngon','đặc-biệt'],['tối'],'món-mặn','cơm','cao',30,['mực','thịt bằm','mộc nhĩ','miến','hành lá'],NORMAL,true),
  D('ngao-hap-sa','Nghêu hấp sả','Nghêu hấp sả ớt, vị ngọt tự nhiên từ biển','🐚',['ngon','healthy','đặc-biệt'],['tối'],'món-mặn','cơm','vừa',15,['nghêu','sả','ớt','lá chanh','gừng'],NORMAL,true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║              MÓN MẶN - TRỨNG / ĐẬU HŨ                       ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('trung-chien-thit','Trứng chiên thịt bằm','Trứng chiên thịt bằm, nhanh gọn cho bữa cơm','🍳',['nhanh','rẻ','gia-đình'],['trưa','tối'],'món-mặn','cơm','rẻ',10,['trứng','thịt bằm','hành lá'],ALL_WEATHER,true),
  D('trung-duc-thit','Trứng đúc thịt','Trứng đúc thịt hành, cắt miếng ăn cơm','🍳',['nhanh','rẻ','gia-đình'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['trứng','thịt bằm','hành lá','tiêu'],ALL_WEATHER,true),
  D('dau-hu-sot-ca','Đậu hũ sốt cà chua','Đậu hũ chiên giòn sốt cà chua, đơn giản mà ngon','🧈',['rẻ','nhanh','healthy'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['đậu hũ','cà chua','hành lá'],HOT,true),
  D('dau-hu-nhoi-thit','Đậu hũ nhồi thịt','Đậu hũ nhồi thịt bằm rim nước mắm','🧈',['ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','rẻ',25,['đậu hũ','thịt bằm','hành lá','nước mắm'],NORMAL,true),
  D('trung-kho','Trứng kho','Trứng kho nước tương, đơn giản mà tốn cơm','🥚',['nhanh','rẻ'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['trứng','nước tương','đường'],COOL,true),
  D('dau-hu-chien-sa','Đậu hũ chiên sả','Đậu hũ chiên giòn rim sả ớt cay thơm','🧈',['rẻ','nhanh','ngon'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['đậu hũ','sả','ớt','nước mắm'],NORMAL,true),
  D('trung-hap-hanh','Trứng hấp hành','Trứng hấp mềm mịn như pudding, trẻ em thích','🥚',['nhanh','rẻ','healthy'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['trứng','hành lá','nước dùng'],NORMAL,true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                        RAU                                    ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('rau-muong-xao-toi','Rau muống xào tỏi','Rau muống xào tỏi giòn ngọt, kinh điển bữa cơm','🥬',['nhanh','rẻ','healthy','gia-đình'],['trưa','tối'],'rau','cơm','rẻ',5,['rau muống','tỏi','dầu ăn'],HOT,true,'nấu-tại-nhà',true),
  D('cai-ngot-xao','Cải ngọt xào tỏi','Cải ngọt xào tỏi xanh giòn','🥬',['nhanh','rẻ','healthy'],['trưa','tối'],'rau','cơm','rẻ',5,['cải ngọt','tỏi','dầu ăn'],HOT,true,'nấu-tại-nhà',true),
  D('rau-lang-luoc','Rau lang luộc','Rau lang luộc chấm kho quẹt, đậm vị miền quê','🥬',['rẻ','healthy','nhanh'],['trưa','tối'],'rau','cơm','rẻ',5,['rau lang'],HOT,true,'nấu-tại-nhà',true),
  D('su-su-xao','Su su xào tỏi','Su su xào tỏi hoặc xào trứng, nhẹ nhàng thanh mát','🥒',['nhanh','rẻ','healthy'],['trưa','tối'],'rau','cơm','rẻ',10,['su su','tỏi','dầu ăn'],NORMAL,true,'nấu-tại-nhà',true),
  D('bap-cai-xao','Bắp cải xào trứng','Bắp cải xào trứng giòn ngọt, giàu chất xơ','🥬',['nhanh','rẻ','gia-đình'],['trưa','tối'],'rau','cơm','rẻ',10,['bắp cải','trứng','tỏi'],NORMAL,true),
  D('dau-bap-luoc','Đậu bắp luộc','Đậu bắp luộc chấm kho quẹt hoặc nước tương','🫛',['nhanh','rẻ','healthy'],['trưa','tối'],'rau','cơm','rẻ',5,['đậu bắp'],HOT,true,'nấu-tại-nhà',true),
  D('mong-toi-xao','Mồng tơi xào tỏi','Mồng tơi xào tỏi bổ dưỡng giải nhiệt','🥬',['nhanh','rẻ','healthy'],['trưa','tối'],'rau','cơm','rẻ',5,['mồng tơi','tỏi'],HOT,true,'nấu-tại-nhà',true),
  D('dua-leo','Dưa leo','Dưa leo cắt miếng ăn kèm, giải nhiệt','🥒',['nhanh','rẻ','healthy'],['trưa','tối'],'rau','cơm','rẻ',0,['dưa leo'],HOT,true,'nấu-tại-nhà',true),
  D('kho-quet','Kho quẹt','Kho quẹt mặn ngọt, chấm rau luộc hoặc cơm nóng','🍯',['rẻ','gia-đình','ngon'],['trưa','tối'],'rau','cơm','rẻ',10,['tôm khô','thịt bằm','nước mắm','đường'],NORMAL,true),
  D('goi-cuon','Gỏi cuốn','Gỏi cuốn tôm thịt, chấm tương đậu phộng','🥗',['healthy','ngon'],['trưa','tối'],'rau','cơm','rẻ',20,['bánh tráng','tôm','thịt','bún','rau sống'],HOT,true),
  D('ca-chua-nhoi-thit','Cà chua nhồi thịt','Cà chua nhồi thịt bằm hấp, vừa rau vừa mặn','🍅',['ngon','gia-đình'],['trưa','tối'],'rau','cơm','rẻ',25,['cà chua','thịt bằm','hành lá'],NORMAL,true),
  D('cai-thia-luoc','Cải thìa luộc','Cải thìa luộc xanh giòn, ăn kèm nước mắm','🥬',['nhanh','rẻ','healthy'],['trưa','tối'],'rau','cơm','rẻ',5,['cải thìa'],HOT,true,'nấu-tại-nhà',true),
  D('muop-xao-trung','Mướp xào trứng','Mướp xào trứng mềm ngọt tự nhiên','🥒',['nhanh','rẻ','healthy'],['trưa','tối'],'rau','cơm','rẻ',10,['mướp','trứng','hành lá'],HOT,true),
  D('bong-cai-xao-toi','Bông cải xào tỏi','Bông cải xanh xào tỏi giòn, giàu vitamin C','🥦',['nhanh','healthy','ngon'],['trưa','tối'],'rau','cơm','rẻ',8,['bông cải xanh','tỏi','dầu hào'],NORMAL,true,'nấu-tại-nhà',true),
  D('bong-cai-trang-luoc','Bông cải trắng luộc','Bông cải trắng luộc chấm nước mắm chanh','🥦',['nhanh','healthy','rẻ'],['trưa','tối'],'rau','cơm','rẻ',5,['bông cải trắng'],NORMAL,true,'nấu-tại-nhà',true),
  D('ca-rot-xao','Cà rốt xào trứng','Cà rốt xào trứng vàng ươm, giàu vitamin A','🥕',['nhanh','rẻ','healthy'],['trưa','tối'],'rau','cơm','rẻ',10,['cà rốt','trứng','hành lá'],NORMAL,true),
  D('dau-que-xao-toi','Đậu que xào tỏi','Đậu que xào tỏi giòn xanh, thanh đạm','🫛',['nhanh','rẻ','healthy'],['trưa','tối'],'rau','cơm','rẻ',8,['đậu que','tỏi','dầu ăn'],NORMAL,true,'nấu-tại-nhà',true),
  D('rau-cai-xao-nam','Cải xào nấm','Cải xào nấm rơm/nấm đùi gà, thanh đạm bổ dưỡng','🍄',['healthy','nhanh','ngon'],['trưa','tối'],'rau','cơm','rẻ',10,['cải ngọt','nấm','tỏi','dầu hào'],NORMAL,true,'nấu-tại-nhà',true),
  D('salad-rau-tron','Salad rau trộn','Rau trộn dầu giấm kiểu Việt, mát giòn','🥗',['healthy','nhanh','rẻ'],['trưa','tối'],'rau','cơm','rẻ',5,['xà lách','cà chua','dưa leo','hành tây','dầu giấm'],HOT,true,'nấu-tại-nhà',true),
  D('bi-ngoi-xao','Bí ngòi xào tỏi','Bí ngòi xào tỏi mềm ngọt, nhẹ bụng','🥒',['nhanh','rẻ','healthy'],['trưa','tối'],'rau','cơm','rẻ',8,['bí ngòi','tỏi','dầu ăn'],NORMAL,true,'nấu-tại-nhà',true),
  D('nam-xao-dau-hao','Nấm xào dầu hào','Nấm đùi gà xào dầu hào bơ tỏi thơm béo','🍄',['ngon','healthy','nhanh'],['trưa','tối'],'rau','cơm','rẻ',10,['nấm đùi gà','tỏi','dầu hào','bơ'],NORMAL,true,'nấu-tại-nhà',true),
  D('goi-ga-bap-cai','Gỏi gà bắp cải','Gỏi gà bắp cải trộn rau răm, chua ngọt giòn','🥗',['ngon','healthy'],['trưa','tối'],'rau','cơm','vừa',15,['gà','bắp cải','rau răm','hành tây','chanh'],HOT,true),
  D('rau-cu-luoc','Rau củ luộc thập cẩm','Cà rốt, bắp cải, đậu que luộc đủ màu sắc','🥕',['healthy','rẻ','nhanh','gia-đình'],['trưa','tối'],'rau','cơm','rẻ',10,['cà rốt','bắp cải','đậu que','bông cải'],NORMAL,true,'nấu-tại-nhà',true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                        CANH                                   ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('canh-chua-ca','Canh chua cá','Canh chua cá lóc, vị chua ngọt đậm đà miền Nam','🐟',['ngon','gia-đình'],['trưa','tối'],'canh','món-nước','vừa',30,['cá','me','cà chua','thơm','đậu bắp','giá'],HOT,true),
  D('canh-bau-tom','Canh bầu tôm','Canh bầu nấu tôm ngọt mát, thanh nhẹ','🥒',['healthy','gia-đình','rẻ'],['trưa','tối'],'canh','món-nước','rẻ',15,['bầu','tôm','hành lá'],HOT,true),
  D('canh-rau-muong-chua','Canh rau muống nấu chua','Canh rau muống nấu me chua, thanh mát giải nhiệt','🥬',['rẻ','healthy','nhanh'],['trưa','tối'],'canh','món-nước','rẻ',10,['rau muống','me','cà chua'],HOT,true),
  D('canh-cai-thit-bam','Canh cải thịt bằm','Canh cải xanh nấu thịt bằm, ngọt dịu','🥬',['nhanh','gia-đình','healthy'],['trưa','tối'],'canh','món-nước','rẻ',15,['cải xanh','thịt bằm','hành lá'],COOL,true),
  D('canh-kho-qua','Canh khổ qua nhồi thịt','Canh khổ qua nhồi thịt, thanh nhiệt giải độc','🥒',['healthy','gia-đình'],['trưa','tối'],'canh','món-nước','rẻ',30,['khổ qua','thịt bằm','hành lá'],HOT,false),
  D('canh-bi-do','Canh bí đỏ nấu tôm','Canh bí đỏ nấu tôm ngọt lịm, bé ăn giỏi','🎃',['healthy','gia-đình','rẻ'],['trưa','tối'],'canh','món-nước','rẻ',15,['bí đỏ','tôm','hành lá'],NORMAL,true),
  D('canh-muop-huong','Canh mướp hương','Canh mướp hương nấu tôm, thanh mát mùa hè','🥒',['healthy','nhanh','rẻ'],['trưa','tối'],'canh','món-nước','rẻ',10,['mướp hương','tôm','hành lá'],HOT,true),
  D('canh-ca-chua-trung','Canh cà chua trứng','Canh cà chua trứng đơn giản, ai cũng nấu được','🍅',['nhanh','rẻ','gia-đình'],['trưa','tối'],'canh','món-nước','rẻ',10,['cà chua','trứng','hành lá'],ALL_WEATHER,true),
  D('canh-rong-bien','Canh rong biển đậu hũ','Canh rong biển đậu hũ kiểu Nhật, thanh lọc','🥬',['healthy','nhanh'],['trưa','tối'],'canh','món-nước','rẻ',10,['rong biển','đậu hũ','hành lá'],NORMAL,true),
  D('canh-mong-toi','Canh mồng tơi mướp','Canh mồng tơi mướp nấu tôm, thanh mát','🥬',['healthy','rẻ','nhanh'],['trưa','tối'],'canh','món-nước','rẻ',10,['mồng tơi','mướp','tôm'],HOT,true),
  D('canh-su-su-xuong','Canh su su nấu xương','Canh su su nấu xương heo, ngọt nước dùng','🥒',['gia-đình','healthy'],['trưa','tối'],'canh','món-nước','rẻ',25,['su su','xương heo','hành lá'],COOL,true),
  D('canh-bi-dao','Canh bí đao nấu tôm','Canh bí đao nấu tôm khô, thanh nhẹ dễ ăn','🥒',['healthy','rẻ'],['trưa','tối'],'canh','món-nước','rẻ',15,['bí đao','tôm khô','hành lá'],HOT,true),
  D('canh-cu-cai','Canh củ cải hầm xương','Canh củ cải trắng hầm xương, ngọt tự nhiên','🥕',['gia-đình','healthy','ngon'],['trưa','tối'],'canh','món-nước','rẻ',40,['củ cải trắng','xương heo','hành lá'],COOL,true),
  D('canh-ca-rot','Canh cà rốt ngô non','Canh cà rốt ngô non nấu sườn, ngọt và giàu dinh dưỡng','🥕',['healthy','gia-đình'],['trưa','tối'],'canh','món-nước','rẻ',20,['cà rốt','ngô non','sườn heo'],NORMAL,true),
  D('canh-nam-dau-hu','Canh nấm đậu hũ','Canh nấm rơm nấu đậu hũ, thanh đạm bổ dưỡng','🍄',['healthy','rẻ','nhanh'],['trưa','tối'],'canh','món-nước','rẻ',10,['nấm rơm','đậu hũ','hành lá'],NORMAL,true),
  D('canh-bap','Canh bắp ngọt xương','Canh bắp ngọt hầm xương, nước ngọt lịm','🌽',['gia-đình','healthy','ngon'],['trưa','tối'],'canh','món-nước','rẻ',25,['bắp ngọt','xương heo','hành lá'],NORMAL,true),
  D('canh-chua-tom','Canh chua tôm','Canh chua tôm nấu bạc hà, chua cay ngọt đủ vị','🦐',['ngon','gia-đình'],['trưa','tối'],'canh','món-nước','vừa',20,['tôm','bạc hà','cà chua','me','giá'],HOT,true),
  D('canh-rau-den','Canh rau dền','Canh rau dền nấu tôm, nước dùng đỏ tím đẹp mắt','🥬',['healthy','rẻ','nhanh'],['trưa','tối'],'canh','món-nước','rẻ',10,['rau dền','tôm','hành lá'],HOT,true),
  D('canh-hen','Canh hến nấu chua','Canh hến nấu khế chua, thanh mát vị biển','🐚',['ngon','healthy'],['trưa','tối'],'canh','món-nước','rẻ',15,['hến','khế','rau thơm','sả'],HOT,true),
  D('canh-khoai-mo','Canh khoai mỡ','Canh khoai mỡ nấu tôm, nước sánh bùi bùi','🟣',['gia-đình','healthy'],['trưa','tối'],'canh','món-nước','rẻ',20,['khoai mỡ','tôm','hành lá'],NORMAL,true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║            MÓN CHÍNH (1 MÓN TRỌN BỮA)                       ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('com-tam','Cơm tấm','Cơm tấm sườn bì chả, nước mắm ngọt','🍚',['ngon','no-lâu','đặc-biệt'],['trưa','tối'],'món-chính','cơm','vừa',30,['gạo tấm','sườn','bì','chả','đồ chua'],HOT,true),
  D('com-chien-duong-chau','Cơm chiên Dương Châu','Cơm chiên tôm, trứng, lạp xưởng đầy đủ','🍳',['nhanh','ngon','gia-đình'],['trưa','tối'],'món-chính','cơm','vừa',20,['cơm nguội','trứng','tôm','lạp xưởng','đậu hà lan'],ALL_WEATHER,true),
  D('bun-thit-nuong','Bún thịt nướng','Bún thịt nướng mỡ hành, đồ chua giòn','🥩',['ngon','no-lâu'],['trưa','tối'],'món-chính','bún-phở','vừa',25,['bún','thịt heo','mỡ hành','đồ chua','nước mắm'],HOT,true),
  D('bun-cha','Bún chả','Bún chả Hà Nội, thịt nướng thơm lừng','🍖',['ngon','đặc-biệt'],['trưa'],'món-chính','bún-phở','vừa',30,['bún','thịt ba chỉ','nước mắm','rau sống'],HOT,true),
  D('ca-ri-ga','Cà ri gà','Cà ri gà nước cốt dừa, ăn với bánh mì hoặc cơm','🍛',['ngon','gia-đình','no-lâu'],['trưa','tối'],'món-chính','món-nước','vừa',40,['gà','khoai tây','cà rốt','nước cốt dừa','bột cà ri'],COOL,true),
  D('bo-kho','Bò kho','Bò kho mềm rệu, nước dùng sánh đậm đà','🍲',['ngon','gia-đình','no-lâu','đặc-biệt'],['trưa','tối'],'món-chính','món-nước','vừa',60,['bò','cà rốt','khoai tây','sả','quế'],COOL,true),
  D('banh-xeo','Bánh xèo','Bánh xèo giòn rụm, nhân tôm thịt giá đậu','🥞',['ngon','gia-đình','đặc-biệt'],['trưa','tối'],'món-chính','bánh','vừa',30,['bột gạo','tôm','thịt','giá','rau sống'],NORMAL,true),
  D('mi-xao-bo','Mì xào bò','Mì xào giòn với bò và rau, hấp dẫn cả nhà','🍝',['ngon','no-lâu','gia-đình'],['trưa','tối'],'món-chính','bún-phở','vừa',20,['mì','bò','cải ngọt','cà rốt'],COOL,true),
  D('hu-tiu-xao','Hủ tiếu xào','Hủ tiếu xào tôm thịt, mùi mỡ hành','🍜',['nhanh','ngon'],['trưa','tối'],'món-chính','bún-phở','vừa',20,['hủ tiếu','tôm','thịt','giá','hẹ'],NORMAL,true),
  D('com-ga-xoi-mo','Cơm gà xối mỡ','Cơm gà giòn rụm, cơm dẻo thơm','🍗',['ngon','no-lâu'],['trưa','tối'],'món-chính','cơm','vừa',40,['gà','gạo','tỏi','nước mắm'],NORMAL,true),
  D('com-chien-tom','Cơm chiên tôm','Cơm chiên tôm nhanh gọn, trẻ em thích','🍳',['nhanh','ngon'],['trưa','tối'],'món-chính','cơm','vừa',15,['cơm nguội','tôm','trứng','hành lá'],NORMAL,true),
  D('bun-bo-xao','Bún bò xào','Bún bò xào rau cải, nhanh gọn cho bữa trưa','🍜',['nhanh','ngon'],['trưa','tối'],'món-chính','bún-phở','vừa',15,['bún','bò','cải ngọt','hành tây'],NORMAL,true),
  D('com-suon-nuong','Cơm sườn nướng','Cơm sườn nướng mỡ hành, trứng ốp la','🍖',['ngon','no-lâu','đặc-biệt'],['trưa','tối'],'món-chính','cơm','vừa',30,['gạo','sườn','trứng','đồ chua','mỡ hành'],HOT,true),
  D('mi-quang-nha','Mì Quảng nấu tại nhà','Mì Quảng tôm thịt nghệ vàng, lá mì dai','🍜',['ngon','đặc-biệt','gia-đình'],['trưa','tối'],'món-chính','bún-phở','vừa',40,['mì Quảng','tôm','thịt','nghệ','đậu phộng','bánh tráng'],NORMAL,true),
  D('bun-mam-nha','Bún mắm nấu tại nhà','Bún mắm miền Tây đậm đà, đầy đủ tôm cá mực','🍜',['ngon','đặc-biệt','no-lâu'],['trưa','tối'],'món-chính','bún-phở','vừa',45,['bún','mắm cá','tôm','cá','mực','cà tím'],NORMAL,true),
  D('banh-canh-gio-heo','Bánh canh giò heo','Bánh canh giò heo nước sánh, thịt mềm rệu','🍜',['ngon','no-lâu','đặc-biệt'],['trưa','tối'],'món-chính','bún-phở','vừa',45,['bột gạo','giò heo','nấm','hành lá'],COOL,true),
  D('com-chien-kim-chi','Cơm chiên kim chi','Cơm chiên kim chi cay nhẹ, phong cách Hàn Quốc','🍳',['nhanh','ngon'],['trưa','tối'],'món-chính','cơm','rẻ',15,['cơm nguội','kim chi','trứng','hành lá'],NORMAL,true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                        LẨU                                   ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('lau-thai','Lẩu Thái','Lẩu Tom Yum chua cay, hải sản tươi','🍲',['ngon','gia-đình','đặc-biệt'],['tối'],'món-chính','lẩu','cao',30,['tôm','mực','nấm','sả','chanh','ớt'],['lạnh','mưa'],false),
  D('lau-ga-la-e','Lẩu gà lá é','Lẩu gà nấu lá é thơm đặc trưng Đà Lạt','🍲',['ngon','gia-đình','đặc-biệt'],['tối'],'món-chính','lẩu','vừa',35,['gà','lá é','nấm','rau nhúng'],COOL,true),
  D('lau-bo','Lẩu bò','Lẩu bò sa tế, thịt bò mềm ngọt','🍲',['ngon','gia-đình','no-lâu','đặc-biệt'],['tối'],'món-chính','lẩu','cao',30,['bò','sa tế','rau nhúng','bún'],['lạnh','mưa'],true),
  D('lau-ca','Lẩu cá','Lẩu cá nấu mẻ hoặc dưa chua, thanh mát','🍲',['ngon','gia-đình'],['tối'],'món-chính','lẩu','vừa',30,['cá','dưa chua','cà chua','rau nhúng'],COOL,true),
  D('lau-nam','Lẩu nấm','Lẩu nấm chay thanh đạm, nhiều loại nấm','🍲',['healthy','gia-đình'],['tối'],'món-chính','lẩu','vừa',25,['nấm các loại','đậu hũ','rau nhúng'],['lạnh','mưa'],true,'nấu-tại-nhà',true),
  D('lau-hai-san','Lẩu hải sản','Lẩu hải sản tươi sống, tôm cua mực nghêu','🍲',['ngon','đặc-biệt','gia-đình'],['tối'],'món-chính','lẩu','cao',30,['tôm','cua','mực','nghêu','rau nhúng'],['lạnh','mưa'],true),
  D('lau-de','Lẩu dê','Lẩu dê nấu thuốc bắc, bổ dưỡng','🍲',['ngon','đặc-biệt','no-lâu'],['tối'],'món-chính','lẩu','cao',40,['thịt dê','thuốc bắc','rau nhúng'],['lạnh','mưa'],false),
  D('lau-mam','Lẩu mắm','Lẩu mắm miền Tây đậm đà, rau nhúng đủ loại','🍲',['ngon','đặc-biệt','gia-đình'],['tối'],'món-chính','lẩu','vừa',35,['mắm cá','cá','tôm','mực','cà tím','rau nhúng'],NORMAL,true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║              MUA NGOÀI - TRƯA/TỐI                             ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('ga-ran','Gà rán','Gà rán giòn rụm kiểu KFC/Jollibee','🍗',['nhanh','ngon'],['trưa','tối'],'món-chính','đồ-ăn-nhanh','vừa',0,[],ALL_WEATHER,true,'mua-ngoài'),
  D('pizza','Pizza','Pizza delivery tiện lợi cho cả nhà','🍕',['nhanh','gia-đình'],['trưa','tối'],'món-chính','đồ-ăn-nhanh','cao',0,[],ALL_WEATHER,true,'mua-ngoài'),
  D('com-binh-dan','Cơm bình dân','Cơm bình dân tự chọn, đa dạng món','🍚',['rẻ','nhanh','gia-đình'],['trưa','tối'],'món-chính','cơm','rẻ',0,[],ALL_WEATHER,true,'mua-ngoài'),
  D('com-ga-hai-nam','Cơm gà Hải Nam','Cơm gà Hải Nam da vàng, cơm dầu thơm','🍗',['ngon','no-lâu'],['trưa','tối'],'món-chính','cơm','vừa',0,[],NORMAL,true,'mua-ngoài'),
  D('bun-dau-mam-tom','Bún đậu mắm tôm','Bún đậu mắm tôm, đậu chiên giòn chấm mắm','🍜',['ngon','đặc-biệt'],['trưa','tối'],'món-chính','bún-phở','vừa',0,[],NORMAL,false,'mua-ngoài'),
  D('com-suon-char','Cơm sườn chả','Cơm sườn nướng chả trứng, đồ chua giòn','🍚',['ngon','no-lâu'],['trưa','tối'],'món-chính','cơm','vừa',0,[],NORMAL,true,'mua-ngoài'),
  D('com-chien-ngoai','Cơm chiên hải sản','Cơm chiên hải sản dĩa nóng hổi','🍳',['ngon','nhanh'],['trưa','tối'],'món-chính','cơm','vừa',0,[],NORMAL,true,'mua-ngoài'),
  D('mi-cay','Mì cay Hàn Quốc','Mì cay 7 cấp độ, thử thách vị giác','🍜',['ngon','đặc-biệt'],['trưa','tối'],'món-chính','bún-phở','vừa',0,[],COOL,false,'mua-ngoài'),
  D('banh-mi-doner','Bánh mì Doner Kebab','Bánh mì doner thịt nướng kiểu Thổ Nhĩ Kỳ','🥖',['ngon','no-lâu'],['trưa','tối'],'món-chính','bánh','vừa',0,[],NORMAL,true,'mua-ngoài'),
  D('bo-ne','Bò né','Bò né trứng ốp la, pate bơ, bánh mì nóng','🍳',['ngon','đặc-biệt','no-lâu'],['sáng','trưa'],'món-chính','khác','vừa',0,[],NORMAL,true,'mua-ngoài'),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║               MÓN CHAY - MÓN MẶN CHAY                       ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('dau-hu-kho-sa-ot','Đậu hũ kho sả ớt','Đậu hũ kho sả ớt đậm đà, thay thịt hoàn hảo','🧈',['ngon','rẻ'],['trưa','tối'],'món-mặn','cơm','rẻ',20,['đậu hũ','sả','ớt','nước tương','đường'],NORMAL,true,'nấu-tại-nhà',true),
  D('dau-hu-sot-nam','Đậu hũ sốt nấm','Đậu hũ chiên giòn sốt nấm đùi gà thơm béo','🧈',['ngon','healthy'],['trưa','tối'],'món-mặn','cơm','rẻ',20,['đậu hũ','nấm đùi gà','nước tương','bơ thực vật'],NORMAL,true,'nấu-tại-nhà',true),
  D('nam-kho-tieu','Nấm kho tiêu','Nấm rơm kho tiêu mặn ngọt, thơm nức','🍄',['ngon','rẻ','nhanh'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['nấm rơm','tiêu','nước tương','đường'],NORMAL,true,'nấu-tại-nhà',true),
  D('dau-hu-chien-xa-chay','Đậu hũ chiên sả (chay)','Đậu hũ chiên sả ớt chay thuần, giòn thơm','🧈',['rẻ','nhanh','ngon'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['đậu hũ','sả','ớt','nước tương'],NORMAL,true,'nấu-tại-nhà',true),
  D('ca-tim-kho','Cà tím kho','Cà tím kho tộ chay, mềm bùi đậm vị','🍆',['ngon','rẻ'],['trưa','tối'],'món-mặn','cơm','rẻ',25,['cà tím','nước tương','đường','tỏi','ớt'],NORMAL,true,'nấu-tại-nhà',true),
  D('nem-chay','Nem chay (Chả giò chay)','Nem chay giòn rụm nhân nấm mộc nhĩ rau củ','🥟',['ngon','đặc-biệt'],['trưa','tối'],'món-mặn','cơm','rẻ',30,['bánh tráng','nấm mèo','mộc nhĩ','cà rốt','khoai môn','miến'],NORMAL,true,'nấu-tại-nhà',true),
  D('dau-phu-xao-nam','Đậu phụ xào nấm','Đậu phụ xào nấm hương, thanh đạm bổ dưỡng','🧈',['healthy','nhanh'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['đậu phụ','nấm hương','cải ngọt','dầu hào chay'],NORMAL,true,'nấu-tại-nhà',true),
  D('kho-quet-chay','Kho quẹt chay','Kho quẹt đậu phộng nước tương, chấm rau luộc','🍯',['rẻ','gia-đình','ngon'],['trưa','tối'],'món-mặn','cơm','rẻ',10,['đậu phộng','nước tương','đường','ớt'],NORMAL,true,'nấu-tại-nhà',true),
  D('ca-ri-chay','Cà ri chay','Cà ri rau củ nước cốt dừa, khoai tây cà rốt bí đỏ','🍛',['ngon','gia-đình','no-lâu'],['trưa','tối'],'món-mặn','cơm','rẻ',30,['khoai tây','cà rốt','bí đỏ','nước cốt dừa','bột cà ri','đậu hũ'],COOL,true,'nấu-tại-nhà',true),
  D('chao-chay','Chao chay','Đậu hũ kho chao thơm béo ngậy','🧈',['ngon','rẻ'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['đậu hũ','chao','sả','ớt','đường'],NORMAL,true,'nấu-tại-nhà',true),
  D('goi-ngo-sen','Gỏi ngó sen','Gỏi ngó sen chay giòn mát, chua ngọt thanh','🥗',['healthy','ngon'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['ngó sen','cà rốt','rau răm','đậu phộng','nước chanh đường'],HOT,true,'nấu-tại-nhà',true),
  D('nam-xao-dau-hao-chay','Nấm xào dầu hào chay','Nấm đùi gà xào dầu hào chay, béo ngậy đậm đà','🍄',['ngon','healthy','nhanh'],['trưa','tối'],'món-mặn','cơm','rẻ',10,['nấm đùi gà','bông cải xanh','cà rốt','dầu hào chay'],NORMAL,true,'nấu-tại-nhà',true),
  D('dau-hu-om-ca-chua','Đậu hũ om cà chua','Đậu hũ om cà chua sốt sánh, thơm ngọt','🍅',['rẻ','nhanh','gia-đình'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['đậu hũ','cà chua','hành lá','rau mùi'],NORMAL,true,'nấu-tại-nhà',true),
  D('bi-do-xao-chay','Bí đỏ xào chay','Bí đỏ xào tỏi vàng ươm, ngọt bùi','🎃',['rẻ','nhanh','healthy'],['trưa','tối'],'món-mặn','cơm','rẻ',10,['bí đỏ','tỏi','dầu ăn'],NORMAL,true,'nấu-tại-nhà',true),
  D('dau-hu-chien-gion','Đậu hũ chiên giòn','Đậu hũ chiên vàng giòn, chấm tương ớt','🧈',['nhanh','rẻ','ngon'],['trưa','tối'],'món-mặn','cơm','rẻ',10,['đậu hũ','bột chiên','nước tương','ớt'],NORMAL,true,'nấu-tại-nhà',true),
  D('nam-rom-xao-chay','Nấm rơm xào chay','Nấm rơm xào tỏi bơ thơm lừng','🍄',['nhanh','ngon','healthy'],['trưa','tối'],'món-mặn','cơm','rẻ',10,['nấm rơm','tỏi','bơ thực vật','hành lá'],NORMAL,true,'nấu-tại-nhà',true),
  D('dau-hu-rim-nuoc-tuong','Đậu hũ rim nước tương','Đậu hũ rim nước tương mặn ngọt, tốn cơm','🧈',['rẻ','nhanh','gia-đình'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['đậu hũ','nước tương','đường','tỏi','ớt'],NORMAL,true,'nấu-tại-nhà',true),
  D('su-suon-chay','Sườn non chay','Sườn non chay từ đậu nành, kho sả ớt đậm đà','🍖',['ngon','đặc-biệt'],['trưa','tối'],'món-mặn','cơm','vừa',25,['sườn chay','sả','ớt','nước tương','đường'],NORMAL,true,'nấu-tại-nhà',true),
  D('thit-kho-chay','Thịt kho chay','Thịt kho trứng chay từ gluten, nước dừa đậm đà','🥚',['ngon','gia-đình','no-lâu'],['trưa','tối'],'món-mặn','cơm','vừa',40,['thịt chay','trứng chay','nước dừa','nước tương'],COOL,true,'nấu-tại-nhà',true),
  D('ga-chien-chay','Gà chiên chay','Gà chiên chay giòn rụm, trẻ em thích','🍗',['ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','vừa',20,['gà chay','bột chiên xù','nước tương'],NORMAL,true,'nấu-tại-nhà',true),
  D('ca-kho-chay','Cá kho chay','Cá kho chay từ chuối xanh/bì đậu, đậm đà','🐟',['ngon','rẻ'],['trưa','tối'],'món-mặn','cơm','rẻ',30,['chuối xanh','nước tương','đường','ớt','tiêu'],COOL,true,'nấu-tại-nhà',true),
  D('dau-hu-xao-xa-ot-chay','Đậu hũ xào sả ớt chay','Đậu hũ non xào sả ớt cay thơm','🧈',['nhanh','ngon'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['đậu hũ non','sả','ớt','nước tương','đường'],COOL,true,'nấu-tại-nhà',true),
  D('khoai-mon-kho-chay','Khoai môn kho chay','Khoai môn kho nước tương, bùi béo dẻo dẻo','🟣',['ngon','no-lâu'],['trưa','tối'],'món-mặn','cơm','rẻ',25,['khoai môn','nước tương','đường','hành lá'],NORMAL,true,'nấu-tại-nhà',true),
  D('mang-xao-chay','Măng xào chay','Măng tươi xào nấm hương, giòn ngọt','🎋',['ngon','healthy'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['măng','nấm hương','đậu hũ','nước tương'],NORMAL,true,'nấu-tại-nhà',true),
  D('dau-hu-sot-cay','Đậu hũ Tứ Xuyên','Đậu hũ sốt cay tê Tứ Xuyên, đậm đà nồng','🌶️',['ngon','đặc-biệt'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['đậu hũ non','tương ớt','tiêu Tứ Xuyên','hành lá','nấm'],NORMAL,false,'nấu-tại-nhà',true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║               MÓN CHAY - RAU CHAY                            ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('rau-xao-thap-cam-chay','Rau xào thập cẩm chay','Rau củ xào thập cẩm đủ màu: cà rốt, bắp cải, nấm, đậu que','🥬',['healthy','gia-đình','ngon'],['trưa','tối'],'rau','cơm','rẻ',10,['cà rốt','bắp cải','nấm','đậu que','bông cải'],NORMAL,true,'nấu-tại-nhà',true),
  D('rau-cu-hap-chay','Rau củ hấp chay','Rau củ hấp giữ nguyên dinh dưỡng, chấm nước tương gừng','🥦',['healthy','rẻ','nhanh'],['trưa','tối'],'rau','cơm','rẻ',10,['bông cải xanh','cà rốt','bắp ngô','khoai lang','đậu que'],NORMAL,true,'nấu-tại-nhà',true),
  D('goi-cuon-chay','Gỏi cuốn chay','Gỏi cuốn rau củ đậu hũ, chấm tương đậu phộng','🥗',['healthy','ngon'],['trưa','tối'],'rau','cơm','rẻ',15,['bánh tráng','đậu hũ','bún','rau sống','dưa leo','cà rốt'],HOT,true,'nấu-tại-nhà',true),
  D('kim-chi-chay','Kim chi chay','Kim chi cải thảo chay, chua cay lên men','🥬',['healthy','ngon'],['trưa','tối'],'rau','cơm','rẻ',0,['cải thảo','ớt bột','gừng','muối'],ALL_WEATHER,true,'nấu-tại-nhà',true),
  D('goi-mit-non','Gỏi mít non','Gỏi mít non trộn rau răm đậu phộng, giòn dai','🥗',['ngon','healthy','đặc-biệt'],['trưa','tối'],'rau','cơm','rẻ',20,['mít non','rau răm','đậu phộng','hành phi','chanh'],HOT,true,'nấu-tại-nhà',true),
  D('salad-trai-cay-chay','Salad trái cây rau củ','Salad mix trái cây rau củ sốt chanh dây','🥗',['healthy','nhanh'],['trưa','tối'],'rau','cơm','rẻ',10,['xoài','dưa leo','cà chua','cà rốt','chanh dây'],HOT,true,'nấu-tại-nhà',true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║               MÓN CHAY - CANH CHAY                           ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('canh-rau-cu-chay','Canh rau củ chay','Canh rau củ nấu nấm, ngọt từ rau tự nhiên','🥕',['healthy','rẻ','gia-đình'],['trưa','tối'],'canh','món-nước','rẻ',15,['cà rốt','su su','bắp cải','nấm rơm','đậu hũ'],NORMAL,true,'nấu-tại-nhà',true),
  D('canh-nam-chay','Canh nấm chay','Canh nấm hỗn hợp ngọt thanh, bổ dưỡng','🍄',['healthy','rẻ','nhanh'],['trưa','tối'],'canh','món-nước','rẻ',10,['nấm đùi gà','nấm rơm','nấm hương','đậu hũ','hành lá'],NORMAL,true,'nấu-tại-nhà',true),
  D('canh-bi-do-chay','Canh bí đỏ chay','Canh bí đỏ nấu đậu hũ, ngọt bùi không cần tôm','🎃',['healthy','rẻ','gia-đình'],['trưa','tối'],'canh','món-nước','rẻ',15,['bí đỏ','đậu hũ','hành lá'],NORMAL,true,'nấu-tại-nhà',true),
  D('canh-chua-chay','Canh chua chay','Canh chua chay nấu thơm me, nấm đậu bắp giá','🍲',['ngon','healthy'],['trưa','tối'],'canh','món-nước','rẻ',20,['thơm','me','nấm','đậu bắp','giá','cà chua'],HOT,true,'nấu-tại-nhà',true),
  D('canh-kho-qua-chay','Canh khổ qua nhồi nấm','Canh khổ qua nhồi nấm đậu hũ, thanh nhiệt','🥒',['healthy'],['trưa','tối'],'canh','món-nước','rẻ',25,['khổ qua','nấm','đậu hũ','miến','hành lá'],HOT,true,'nấu-tại-nhà',true),
  D('canh-bap-cai-chay','Canh bắp cải nấm','Canh bắp cải nấu nấm rơm, thanh ngọt nhẹ nhàng','🥬',['healthy','rẻ','nhanh'],['trưa','tối'],'canh','món-nước','rẻ',10,['bắp cải','nấm rơm','hành lá'],NORMAL,true,'nấu-tại-nhà',true),
  D('canh-muop-chay','Canh mướp nấu nấm','Canh mướp hương nấu nấm, thanh mát chay thuần','🥒',['healthy','rẻ','nhanh'],['trưa','tối'],'canh','món-nước','rẻ',10,['mướp hương','nấm rơm','hành lá'],HOT,true,'nấu-tại-nhà',true),
  D('canh-rau-den-chay','Canh rau dền chay','Canh rau dền nấu đậu hũ, nước dùng tím đẹp mắt','🥬',['healthy','rẻ','nhanh'],['trưa','tối'],'canh','món-nước','rẻ',10,['rau dền','đậu hũ','hành lá'],HOT,true,'nấu-tại-nhà',true),
  D('canh-bap-chay','Canh bắp ngọt chay','Canh bắp ngọt nấu nấm, ngọt tự nhiên','🌽',['healthy','gia-đình','ngon'],['trưa','tối'],'canh','món-nước','rẻ',15,['bắp ngọt','nấm','hành lá'],NORMAL,true,'nấu-tại-nhà',true),
  D('canh-khoai-mo-chay','Canh khoai mỡ chay','Canh khoai mỡ nấu nấm, nước sánh bùi','🟣',['healthy','gia-đình'],['trưa','tối'],'canh','món-nước','rẻ',20,['khoai mỡ','nấm','hành lá'],NORMAL,true,'nấu-tại-nhà',true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║               MÓN CHAY - MÓN CHÍNH CHAY                      ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('com-chien-chay','Cơm chiên chay','Cơm chiên rau củ nấm đủ màu sắc','🍳',['nhanh','ngon','gia-đình'],['trưa','tối'],'món-chính','cơm','rẻ',15,['cơm nguội','cà rốt','đậu que','bắp ngọt','nấm','nước tương'],NORMAL,true,'nấu-tại-nhà',true),
  D('bun-chay','Bún chay','Bún chay nước lèo nấm, rau sống đầy đủ','🍜',['healthy','ngon'],['trưa','tối'],'món-chính','bún-phở','rẻ',20,['bún','nấm','đậu hũ','cà chua','rau sống'],NORMAL,true,'nấu-tại-nhà',true),
  D('pho-chay','Phở chay','Phở chay nước dùng rau củ, thanh đạm','🍜',['healthy','ngon'],['sáng','trưa'],'món-chính','bún-phở','rẻ',25,['phở','nấm','đậu hũ','cải ngọt','hành lá','gừng'],COOL,true,'nấu-tại-nhà',true),
  D('mi-xao-chay','Mì xào chay','Mì xào giòn rau củ nấm, đủ màu đủ chất','🍝',['nhanh','ngon','gia-đình'],['trưa','tối'],'món-chính','bún-phở','rẻ',15,['mì','nấm','cải ngọt','cà rốt','bắp cải','dầu hào chay'],NORMAL,true,'nấu-tại-nhà',true),
  D('lau-nam-chay','Lẩu nấm chay','Lẩu nấm 5 loại chay thuần, đậu hũ rau nhúng','🍲',['healthy','gia-đình','đặc-biệt'],['tối'],'món-chính','lẩu','vừa',25,['nấm đùi gà','nấm rơm','nấm hương','nấm kim châm','đậu hũ','rau nhúng'],['lạnh','mưa'],true,'nấu-tại-nhà',true),
  D('banh-xeo-chay','Bánh xèo chay','Bánh xèo giòn nhân nấm giá đậu xanh','🥞',['ngon','đặc-biệt'],['trưa','tối'],'món-chính','bánh','rẻ',25,['bột gạo','nấm','giá','đậu xanh','nghệ','rau sống'],NORMAL,true,'nấu-tại-nhà',true),
  D('hu-tiu-chay','Hủ tiếu chay','Hủ tiếu chay nước dùng rau củ, ngọt thanh','🍜',['ngon','healthy'],['sáng','trưa'],'món-chính','bún-phở','rẻ',20,['hủ tiếu','nấm','đậu hũ','cải ngọt','cần tây'],COOL,true,'nấu-tại-nhà',true),
  D('com-chay-phan','Cơm chay phần','Cơm chay đĩa: cơm + 3 món chay đa dạng','🍚',['ngon','gia-đình','healthy'],['trưa','tối'],'món-chính','cơm','rẻ',0,[],ALL_WEATHER,true,'mua-ngoài',true),
  D('bun-rieu-chay','Bún riêu chay','Bún riêu chay nấu từ đậu hũ cà chua, chua ngọt','🍜',['ngon','đặc-biệt'],['trưa','tối'],'món-chính','bún-phở','rẻ',25,['bún','đậu hũ','cà chua','me','rau sống','giá'],HOT,true,'nấu-tại-nhà',true),
  D('mi-quang-chay','Mì Quảng chay','Mì Quảng chay nước lèo nghệ vàng, đậu phộng giòn','🍜',['ngon','đặc-biệt'],['trưa','tối'],'món-chính','bún-phở','rẻ',30,['mì Quảng','nấm','đậu hũ','nghệ','đậu phộng','bánh tráng','rau sống'],NORMAL,true,'nấu-tại-nhà',true),
  D('banh-cuon-chay','Bánh cuốn chay','Bánh cuốn chay nhân nấm mộc nhĩ, chấm nước tương','🥟',['ngon','đặc-biệt'],['sáng','trưa'],'món-chính','bánh','rẻ',25,['bột gạo','nấm mèo','mộc nhĩ','hành phi'],NORMAL,true,'nấu-tại-nhà',true),
  D('lau-chay-thap-cam','Lẩu chay thập cẩm','Lẩu chay nước dùng rau củ, đầy đủ nấm đậu hũ rau','🍲',['ngon','gia-đình','đặc-biệt'],['tối'],'món-chính','lẩu','vừa',30,['nấm','đậu hũ','bắp ngọt','cà rốt','bắp cải','bún','rau nhúng'],['lạnh','mưa'],true,'nấu-tại-nhà',true),
  D('bo-kho-chay','Bò kho chay','Bò kho chay từ gluten, nước dùng sả quế đậm đà','🍲',['ngon','no-lâu','đặc-biệt'],['trưa','tối'],'món-chính','món-nước','vừa',45,['bò chay','cà rốt','khoai tây','sả','quế','nước tương'],COOL,true,'nấu-tại-nhà',true),
  D('banh-canh-chay','Bánh canh chay','Bánh canh chay nước dùng nấm sánh mịn','🍜',['ngon','no-lâu'],['trưa','tối'],'món-chính','bún-phở','rẻ',25,['bột gạo','nấm','đậu hũ','hành lá'],COOL,true,'nấu-tại-nhà',true),
  D('com-tron-chay','Cơm trộn chay kiểu Hàn','Cơm trộn bibimbap chay, rau củ đủ màu sốt gochujang','🍚',['ngon','healthy','đặc-biệt'],['trưa','tối'],'món-chính','cơm','rẻ',20,['cơm','cà rốt','rau bina','giá','nấm','kim chi','dưa leo','gochujang'],NORMAL,true,'nấu-tại-nhà',true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║               MÓN CHAY - ĂN SÁNG CHAY                        ║
  // ╚══════════════════════════════════════════════════════════════╝
  D('chao-nam-chay','Cháo nấm chay','Cháo nấm rơm thanh đạm, ấm bụng buổi sáng','🥣',['healthy','rẻ'],['sáng'],'ăn-sáng','cháo','rẻ',15,['gạo','nấm rơm','hành lá','gừng','rau mùi'],COOL,true,'nấu-tại-nhà',true),
  D('banh-mi-chay','Bánh mì chay','Bánh mì chay nhân đậu hũ rau củ','🥖',['nhanh','rẻ','healthy'],['sáng'],'ăn-sáng','bánh','rẻ',5,['bánh mì','đậu hũ','dưa leo','cà rốt','nước tương'],ALL_WEATHER,true,'nấu-tại-nhà',true),
  D('xoi-chay','Xôi chay','Xôi đậu đen/đậu xanh chay, dẻo thơm','🍚',['no-lâu','rẻ'],['sáng'],'ăn-sáng','khác','rẻ',15,['nếp','đậu đen','đậu xanh','muối mè'],COOL,true,'nấu-tại-nhà',true),
  D('chao-dau-do-chay','Cháo đậu đỏ chay','Cháo đậu đỏ ngọt/mặn, bổ dưỡng','🥣',['healthy','rẻ','gia-đình'],['sáng'],'ăn-sáng','cháo','rẻ',20,['gạo','đậu đỏ','đường/muối','dừa nạo'],COOL,true,'nấu-tại-nhà',true),
  D('bun-chay-sang','Bún riêu chay sáng','Bún riêu chay nóng hổi cho buổi sáng','🍜',['ngon','healthy'],['sáng'],'ăn-sáng','bún-phở','rẻ',20,['bún','đậu hũ','cà chua','rau sống'],NORMAL,true,'nấu-tại-nhà',true),
  D('banh-bao-chay','Bánh bao chay','Bánh bao nhân đậu xanh nấm mộc nhĩ','🥟',['ngon','tiện'],['sáng'],'ăn-sáng','bánh','rẻ',10,['bột mì','đậu xanh','nấm mèo','mộc nhĩ'],ALL_WEATHER,true,'nấu-tại-nhà',true),
  D('sinh-to-chay','Sinh tố xanh','Sinh tố rau bina chuối bơ, giàu dinh dưỡng','🥤',['healthy','nhanh'],['sáng'],'ăn-sáng','khác','rẻ',5,['rau bina','chuối','bơ','sữa đậu nành'],ALL_WEATHER,true,'nấu-tại-nhà',true),

  // ╔══════════════════════════════════════════════════════════════╗
  // ║           MÓN SUPERFOOD — GIÀU VI CHẤT VÀNG                  ║
  // ╚══════════════════════════════════════════════════════════════╝

  // Omega-3 (Hạt tía tô)
  D('com-hat-tia-to','Cơm rắc hạt tía tô','Cơm trắng rắc hạt tía tô rang — Omega-3 số 1 Việt Nam','🍚',['healthy','rẻ','nhanh'],['trưa','tối'],'món-chính','cơm','rẻ',5,['cơm','hạt tía tô'],ALL_WEATHER,true,'nấu-tại-nhà',false,{sf:['omega3'],tips:['Hạt tía tô: Omega-3 vượt cả cá hồi, rắc lên cơm mỗi bữa']}),
  D('ca-thu-kho','Cá thu kho nghệ','Cá thu kho nghệ dân dã, Omega-3 + Curcumin','🐟',['ngon','healthy','rẻ'],['trưa','tối'],'món-mặn','cơm','rẻ',25,['cá thu','nghệ','nước mắm','tiêu đen','hành'],COOL,true,'nấu-tại-nhà',false,{sf:['omega3','curcumin'],tips:['Cá thu: Omega-3 giá rẻ. Nghệ + tiêu đen tăng hấp thu 2000%']}),
  D('ca-hoi-ap-chao','Cá hồi áp chảo','Cá hồi áp chảo bơ tỏi, giàu Omega-3 DHA+EPA','🐟',['ngon','healthy','đặc-biệt'],['trưa','tối'],'món-mặn','cơm','cao',15,['cá hồi','bơ','tỏi','tiêu','chanh'],NORMAL,true,'nấu-tại-nhà',false,{sf:['omega3']}),
  D('salad-hat-tia-to','Salad rau trộn hạt tía tô','Salad rau xanh trộn dầu oliu, rắc hạt tía tô','🥗',['healthy','nhanh','rẻ'],['trưa','tối'],'rau','khác','rẻ',10,['rau xà lách','cà chua','dưa leo','hạt tía tô','dầu oliu'],HOT,true,'nấu-tại-nhà',false,{sf:['omega3'],fist:2}),

  // Lecithin (Trứng chim cút, Đậu phụ)
  D('trung-cut-luoc','Trứng cút luộc','5 quả trứng cút luộc — Lecithin cực cao, tốt cho trí nhớ','🥚',['nhanh','rẻ','healthy'],['sáng','trưa','tối'],'ăn-vặt','khác','rẻ',8,['trứng chim cút'],ALL_WEATHER,true,'nấu-tại-nhà',false,{sf:['lecithin'],tips:['5 quả cút = 1 quả gà, Lecithin cao gấp bội, ít dị ứng']}),
  D('trung-cut-kho','Trứng cút kho thịt','Trứng cút kho thịt ba chỉ nước dừa, đậm đà','🥚',['ngon','gia-đình','no-lâu'],['trưa','tối'],'món-mặn','cơm','rẻ',35,['trứng chim cút','thịt ba chỉ','nước dừa','nước mắm'],COOL,true,'nấu-tại-nhà',false,{sf:['lecithin']}),
  D('dau-phu-sot-ca','Đậu phụ sốt cà chua','Đậu phụ rán sốt cà chua — Lecithin thực vật giá rẻ','🧊',['rẻ','nhanh','healthy'],['trưa','tối'],'món-mặn','cơm','rẻ',15,['đậu phụ','cà chua','hành lá','nước mắm'],NORMAL,true,'nấu-tại-nhà',true,{sf:['lecithin'],cw:['oil-high-heat'],tips:['Đậu phụ giàu Lecithin. Rán bằng mỡ lợn — không dùng dầu thực vật nhiệt cao']}),
  D('dau-phu-nhoi-thit','Đậu phụ nhồi thịt','Đậu phụ nhồi thịt bằm chiên giòn, chấm nước mắm chua ngọt','🧊',['ngon','gia-đình'],['trưa','tối'],'món-mặn','cơm','rẻ',25,['đậu phụ','thịt bằm','nấm mèo','hành lá'],NORMAL,true,'nấu-tại-nhà',false,{sf:['lecithin']}),

  // Vitamin E (Hạt hướng dương)
  D('rau-tron-hat-huong-duong','Rau trộn hạt hướng dương','Rau xanh trộn hạt hướng dương — vô địch Vitamin E','🥗',['healthy','nhanh'],['trưa','tối'],'rau','khác','rẻ',10,['rau xà lách','cà rốt','hạt hướng dương','dầu oliu','chanh'],HOT,true,'nấu-tại-nhà',true,{sf:['vitamin-e'],fist:2,tips:['Hạt hướng dương: vô địch Vitamin E, chống oxy hóa, đẹp da']}),

  // Kẽm (Hàu biển)
  D('hau-nuong-mo-hanh','Hàu nướng mỡ hành','Hàu biển nướng mỡ hành, giàu Kẽm nhất','🦪',['ngon','đặc-biệt'],['tối'],'món-mặn','khác','vừa',15,['hàu biển','mỡ hành','đậu phộng','hành phi'],NORMAL,true,'nấu-tại-nhà',false,{sf:['zinc-rich'],tips:['Hàu: rẻ tiền nhưng giàu Kẽm nhất, tăng miễn dịch']}),
  D('hau-chien-trung','Hàu chiên trứng (Ô Tạc Tiễn)','Hàu chiên bột trứng kiểu Đài — giòn bên ngoài, mềm bên trong','🦪',['ngon','đặc-biệt'],['tối'],'món-mặn','khác','vừa',20,['hàu biển','trứng','bột năng','hành lá','giá'],NORMAL,true,'nấu-tại-nhà',false,{sf:['zinc-rich','lecithin']}),

  // Chất xơ (Khoai lang thay tinh bột)
  D('khoai-lang-luoc','Khoai lang luộc','Khoai lang luộc thay cơm — an toàn, KHÔNG Lectin, giàu chất xơ','🍠',['healthy','rẻ','nhanh'],['sáng','trưa','tối'],'món-chính','khác','rẻ',15,['khoai lang'],ALL_WEATHER,true,'nấu-tại-nhà',true,{sf:['fiber-rich'],tips:['Khoai lang: thay gạo lứt/bánh mì nguyên cám — an toàn, không Lectin']}),
  D('khoai-lang-nuong','Khoai lang nướng','Khoai lang nướng ngọt tự nhiên, thơm bùi','🍠',['ngon','healthy','rẻ'],['sáng','tối'],'ăn-vặt','khác','rẻ',30,['khoai lang'],COOL,true,'nấu-tại-nhà',true,{sf:['fiber-rich']}),
  D('canh-khoai-lang','Canh khoai lang lá','Canh khoai lang nấu lá khoai, ngọt mát dân dã','🍲',['healthy','rẻ','gia-đình'],['trưa','tối'],'canh','món-nước','rẻ',15,['khoai lang','lá khoai lang','tôm khô','hành lá'],HOT,true,'nấu-tại-nhà',false,{sf:['fiber-rich'],fist:2}),

  // Nghệ + Tiêu đen (Curcumin)
  D('ca-kho-nghe','Cá kho nghệ','Cá kho nghệ tiêu đen — chống viêm cực mạnh','🐟',['ngon','healthy','rẻ'],['trưa','tối'],'món-mặn','cơm','rẻ',25,['cá','nghệ tươi','tiêu đen','nước mắm','hành lá'],COOL,true,'nấu-tại-nhà',false,{sf:['curcumin','anti-inflammatory'],tips:['Nghệ + tiêu đen: Curcumin chống viêm, tiêu đen tăng hấp thu 2000%']}),
  D('com-nghe','Cơm nghệ','Cơm nấu nghệ vàng, thơm nhẹ, đẹp mắt','🍚',['healthy','nhanh','rẻ'],['trưa','tối'],'món-chính','cơm','rẻ',20,['gạo','nghệ tươi','tiêu đen','dầu dừa'],NORMAL,true,'nấu-tại-nhà',true,{sf:['curcumin']}),

  // Probiotic
  D('kim-chi-han-quoc','Kim chi Hàn Quốc','Kim chi tự làm, probiotic tự nhiên cho đường ruột','🥬',['healthy','rẻ'],['trưa','tối'],'rau','khác','rẻ',0,['kim chi'],ALL_WEATHER,true,'mua-ngoài',true,{sf:['probiotic'],fist:1}),
  D('sua-chua-khong-duong','Sữa chua không đường','Sữa chua không đường + hạt, probiotic + protein','🥛',['healthy','nhanh'],['sáng','tối'],'ăn-vặt','tráng-miệng','rẻ',0,['sữa chua','hạt hướng dương','hạt tía tô'],ALL_WEATHER,true,'mua-ngoài',true,{sf:['probiotic','omega3','vitamin-e'],tips:['Thêm hạt tía tô + hướng dương = Omega-3 + Vitamin E']}),
];

// All unique ingredients across all dishes
export const allIngredients = Array.from(
  new Set(dishes.flatMap((d) => d.ingredients).filter(Boolean))
).sort();
