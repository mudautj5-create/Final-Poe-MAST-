import React, { useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type CourseType = 'Starters' | 'Mains' | 'Desserts' | 'Beverages';

type Dish = {
  id: number;
  name: string;
  course: CourseType;
  description: string;
  price: number;
  image: string;
};

const courseOptions: Array<'All' | CourseType> = ['All', 'Starters', 'Mains', 'Desserts', 'Beverages'];

const initialDishes: Dish[] = [
  {
    id: 1,
    name: 'Bobotie',
    course: 'Mains',
    description: 'Traditional South African minced meat with a savoury custard topping.',
    price: 145,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Malva Pudding',
    course: 'Desserts',
    description: 'Warm caramel sponge dessert served with creamy custard.',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Butternut Soup',
    course: 'Starters',
    description: 'Silky roasted butternut soup with a hint of cinnamon and cream.',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Grilled Kingklip',
    course: 'Mains',
    description: 'Fresh kingklip grilled with citrus herbs and served with seasonal sides.',
    price: 180,
    image:
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Koeksisters',
    course: 'Desserts',
    description: 'Crisp, syrup-soaked pastry twists coated in a light cinnamon sugar finish.',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
  },
];

const COLORS = {
  background: '#0f0f10',
  shell: '#e9d8c7',
  cream: '#f2e8df',
  beige: '#f0e6db',
  panel: '#f3efe8',
  border: '#d7cfc3',
  text: '#2f241d',
  muted: '#72665c',
  gold: '#c99840',
  goldDark: '#9d7423',
  goldLight: '#f4e8c5',
  danger: '#b85959',
  white: '#ffffff',
  darkBrown: '#3d2a1d',
  input: '#f6f2ee',
  shadow: '#00000029',
};

export default function App() {
  const [screen, setScreen] = useState<'list' | 'add' | 'details'>('list');
  const [filter, setFilter] = useState<'All' | CourseType>('All');
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [selectedDishId, setSelectedDishId] = useState<number>(initialDishes[0].id);
  const [form, setForm] = useState({
    name: '',
    description: '',
    course: '' as CourseType | '',
    price: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDishes = useMemo(() => {
    if (filter === 'All') return dishes;
    return dishes.filter((dish) => dish.course === filter);
  }, [dishes, filter]);

  const searchedDishes = useMemo(() => {
    if (!searchQuery) return filteredDishes;
    const cleanSearch = searchQuery.toLowerCase();
    return filteredDishes.filter((dish) => dish.name.toLowerCase().includes(cleanSearch));
  }, [filteredDishes, searchQuery]);

  const selectedDish = dishes.find((dish) => dish.id === selectedDishId) ?? dishes[0];

  const openDetails = (dish: Dish) => {
    setSelectedDishId(dish.id);
    setScreen('details');
  };

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      course: '',
      price: '',
    });
  };

  const saveDish = () => {
    const cleanName = form.name.trim();
    const cleanDescription = form.description.trim();
    const cleanPrice = Number(form.price.replace(/[^0-9.]/g, ''));

    if (!cleanName || !cleanDescription || !form.course || !form.price || Number.isNaN(cleanPrice)) {
      return;
    }

    const newDish: Dish = {
      id: Date.now(),
      name: cleanName,
      course: form.course,
      description: cleanDescription,
      price: cleanPrice,
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    };

    setDishes((current) => [newDish, ...current]);
    setSelectedDishId(newDish.id);
    resetForm();
    setScreen('details');
  };

  const deleteDish = () => {
    if (!selectedDish) return;

    const remainingDishes = dishes.filter((dish) => dish.id !== selectedDish.id);
    setDishes(remainingDishes);

    if (remainingDishes.length > 0) {
      setSelectedDishId(remainingDishes[0].id);
    }

    setScreen('list');
  };

  const renderListScreen = () => (
    <SafeAreaView style={styles.screenShell}>
      <View style={styles.phoneFrame}>
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.statusIcons}>
            <Text style={styles.statusIcon}>◔</Text>
            <Text style={styles.statusIcon}>◍</Text>
            <Text style={styles.statusIcon}>◉</Text>
          </View>
        </View>

        <View style={styles.appCard}>
          <View style={styles.headerBand}>
            <View style={styles.logoSquare}>
              <Text style={styles.logoX}>✕</Text>
            </View>
            <View style={styles.headerTitleWrap}>
              <Text style={styles.headerTitle}>Christoffel's Table</Text>
              <Text style={styles.headerSubtitle}>TRADITIONAL SOUTH AFRICAN CUISINE</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listScroll}>
            <View style={styles.searchBox}>
              <Text style={styles.searchText}>Search by Dish Name</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="e.g. Bobotie"
                placeholderTextColor={COLORS.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={styles.filterRow}>
              {courseOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setFilter(option)}
                  style={[styles.filterChip, filter === option && styles.filterChipActive]}
                >
                  <Text style={[styles.filterText, filter === option && styles.filterTextActive]}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Menu Statistics</Text>

              <View style={styles.statsGrid}>
                <View style={styles.statTile}>
                  <Text style={styles.statLabel}>Total Dishes</Text>
                  <Text style={styles.statValue}>{dishes.length}</Text>
                </View>

                <View style={styles.statTile}>
                  <Text style={styles.statLabel}>Starters</Text>
                  <Text style={styles.statValue}>
                    {dishes.filter((dish) => dish.course === 'Starters').length}
                  </Text>
                </View>

                <View style={styles.statTile}>
                  <Text style={styles.statLabel}>Mains</Text>
                  <Text style={styles.statValue}>{dishes.filter((dish) => dish.course === 'Mains').length}</Text>
                </View>

                <View style={styles.statTile}>
                  <Text style={styles.statLabel}>Desserts</Text>
                  <Text style={styles.statValue}>
                    {dishes.filter((dish) => dish.course === 'Desserts').length}
                  </Text>
                </View>

                <View style={styles.statTile}>
                  <Text style={styles.statLabel}>Beverages</Text>
                  <Text style={styles.statValue}>
                    {dishes.filter((dish) => dish.course === 'Beverages').length}
                  </Text>
                </View>
              </View>

              <View style={styles.courseStatsRow}>
                <Text style={styles.courseStatText}>Starters: {dishes.filter((dish) => dish.course === 'Starters').length}</Text>
                <Text style={styles.courseStatText}>Mains: {dishes.filter((dish) => dish.course === 'Mains').length}</Text>
                <Text style={styles.courseStatText}>Desserts: {dishes.filter((dish) => dish.course === 'Desserts').length}</Text>
                <Text style={styles.courseStatText}>Beverages: {dishes.filter((dish) => dish.course === 'Beverages').length}</Text>
              </View>
            </View>

            <View style={styles.dishList}>
              {searchedDishes.map((dish) => (
                <TouchableOpacity key={dish.id} onPress={() => openDetails(dish)} activeOpacity={0.9}>
                  <View style={styles.dishRow}>
                    <View style={styles.dishInfo}>
                      <Text style={styles.dishName}>{dish.name}</Text>
                      <Text style={styles.dishType}>{dish.course}</Text>
                    </View>

                    <View style={styles.dishThumbWrap}>
                      <Image source={{ uri: dish.image }} style={styles.dishThumb} />
                    </View>

                    <Text style={styles.dishPrice}>R{dish.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.addButton} onPress={() => setScreen('add')} activeOpacity={0.9}>
            <Text style={styles.addButtonText}>+ Add New Dish</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.pageIndicator}>1 / 3</Text>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}>{'>'}</Text>
          </TouchableOpacity>
          <Text style={styles.deviceText}>iPhone 17</Text>
        </View>
      </View>
    </SafeAreaView>
  );

  const renderAddScreen = () => (
    <SafeAreaView style={styles.screenShell}>
      <View style={styles.phoneFrame}>
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.statusIcons}>
            <Text style={styles.statusIcon}>◔</Text>
            <Text style={styles.statusIcon}>◍</Text>
            <Text style={styles.statusIcon}>◉</Text>
          </View>
        </View>

        <View style={styles.appCard}>
          <View style={styles.formHeader}>
            <TouchableOpacity onPress={() => setScreen('list')}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <View style={styles.formTitleWrap}>
              <Text style={styles.formBrand}>Christoffel's</Text>
              <Text style={styles.formHeading}>ADD NEW DISH</Text>
            </View>
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
              <Text style={styles.fieldLabel}>Dish Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Traditional Bobotie"
                placeholderTextColor={COLORS.muted}
                value={form.name}
                onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))}
              />

              <Text style={styles.fieldLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter a short description of the dish..."
                placeholderTextColor={COLORS.muted}
                multiline
                numberOfLines={4}
                value={form.description}
                onChangeText={(value) => setForm((prev) => ({ ...prev, description: value }))}
              />

              <Text style={styles.fieldLabel}>Course</Text>
              <View style={styles.selectBox}>
                <Text style={[styles.selectText, !form.course && styles.placeholderText]}>
                  {form.course || 'Select a course'}
                </Text>
                <Text style={styles.chevron}>⌄</Text>
              </View>

              <View style={styles.courseOptionsGrid}>
                {['Starters', 'Mains', 'Desserts', 'Beverages'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setForm((prev) => ({ ...prev, course: option as CourseType }))}
                    style={[styles.courseOption, form.course === option && styles.courseOptionActive]}
                  >
                    <Text style={[styles.courseOptionText, form.course === option && styles.courseOptionTextActive]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.fieldLabel}>Price (R)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 145.00"
                placeholderTextColor={COLORS.muted}
                keyboardType="decimal-pad"
                value={form.price}
                onChangeText={(value) => setForm((prev) => ({ ...prev, price: value }))}
              />
            </ScrollView>
          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.saveButton} onPress={saveDish} activeOpacity={0.9}>
            <Text style={styles.saveButtonText}>Save Dish</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.pageIndicator}>2 / 3</Text>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}>{'>'}</Text>
          </TouchableOpacity>
          <Text style={styles.deviceText}>iPhone 17</Text>
        </View>
      </View>
    </SafeAreaView>
  );

  const renderDetailsScreen = () => {
    if (!selectedDish) return null;

    return (
      <SafeAreaView style={styles.screenShell}>
        <View style={styles.phoneFrame}>
          <View style={styles.statusBar}>
            <Text style={styles.timeText}>9:41</Text>
            <View style={styles.statusIcons}>
              <Text style={styles.statusIcon}>◔</Text>
              <Text style={styles.statusIcon}>◍</Text>
              <Text style={styles.statusIcon}>◉</Text>
            </View>
          </View>

          <View style={styles.appCard}>
            <View style={styles.formHeader}>
              <TouchableOpacity onPress={() => setScreen('list')}>
                <Text style={styles.backText}>← Back</Text>
              </TouchableOpacity>
              <View style={styles.formTitleWrap}>
                <Text style={styles.formBrand}>Christoffel's</Text>
                <Text style={styles.formHeading}>DISH DETAILS</Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailsContent}>
              <Image source={{ uri: selectedDish.image }} style={styles.detailsImage} />

              <View style={styles.detailsHeaderRow}>
                <Text style={styles.detailsName}>{selectedDish.name}</Text>
                <Text style={styles.detailsPrice}>R{selectedDish.price}</Text>
              </View>

              <View style={styles.pillRow}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{selectedDish.course}</Text>
                </View>
                <View style={styles.pillMuted}>
                  <Text style={styles.pillMutedText}>Traditional</Text>
                </View>
              </View>

              <View style={styles.detailsInfoBox}>
                <Text style={styles.detailsDescription}>{selectedDish.description}</Text>
              </View>
            </ScrollView>

            <View style={styles.detailsButtonRow}>
              <TouchableOpacity style={styles.detailsEditButton} onPress={() => setScreen('add')}>
                <Text style={styles.detailsButtonText}>Edit Dish</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailsDeleteButton} onPress={deleteDish}>
                <Text style={styles.detailsButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.pageIndicator}>3 / 3</Text>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navText}>{'>'}</Text>
            </TouchableOpacity>
            <Text style={styles.deviceText}>iPhone 17</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  if (screen === 'add') return renderAddScreen();
  if (screen === 'details') return renderDetailsScreen();
  return renderListScreen();
}

const styles = StyleSheet.create({
  screenShell: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.background,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  phoneFrame: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: COLORS.background,
    padding: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#3f2c22',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  timeText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIcon: {
    color: COLORS.white,
    fontSize: 15,
  },
  appCard: {
    flex: 1,
    backgroundColor: COLORS.cream,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
  },
  headerBand: {
    backgroundColor: '#4a3328',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoSquare: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#f3efe7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoX: {
    color: '#3d2a1d',
    fontSize: 24,
    fontWeight: '700',
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#d9ad59',
    fontWeight: '700',
    fontSize: 24,
    fontFamily: 'Georgia',
  },
  headerSubtitle: {
    color: '#e7d3ad',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 4,
  },
  listScroll: {
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  searchBox: {
    marginTop: 12,
    marginBottom: 10,
  },
  searchText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: '#f8f3ee',
    borderWidth: 1,
    borderColor: '#d9cfc4',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 12,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#d9cfc4',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f7f1ec',
  },
  filterChipActive: {
    backgroundColor: '#e4be6b',
    borderColor: '#d7a74d',
  },
  filterText: {
    color: '#584b42',
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#231a12',
  },
  statsCard: {
    backgroundColor: '#efe5da',
    borderWidth: 1,
    borderColor: '#dccbb5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  statsTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statTile: {
    width: '48%',
    backgroundColor: '#f9f5f1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e4d8ca',
    padding: 10,
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '800',
  },
  courseStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 8,
  },
  courseStatText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
  },
  dishList: {
    gap: 10,
    paddingBottom: 8,
  },
  dishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1eadf',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e6dccf',
  },
  dishInfo: {
    flex: 1,
    marginRight: 8,
  },
  dishName: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 3,
  },
  dishType: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  dishThumbWrap: {
    width: 90,
    height: 74,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#d7d0c7',
  },
  dishThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dishPrice: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 8,
  },
  addButton: {
    marginHorizontal: 18,
    marginBottom: 14,
    backgroundColor: '#d0a14d',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fffaf5',
    fontSize: 18,
    fontWeight: '700',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#3b2d26',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  navButton: {
    borderWidth: 1,
    borderColor: '#c8b2d4',
    borderRadius: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd1e1',
  },
  navText: {
    fontSize: 20,
    color: '#2b1d1a',
    fontWeight: '700',
  },
  pageIndicator: {
    color: '#f4eee5',
    fontWeight: '700',
    fontSize: 15,
  },
  deviceText: {
    color: '#f4eee5',
    fontWeight: '700',
    fontSize: 15,
  },
  formHeader: {
    backgroundColor: '#4a3328',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 10,
  },
  backText: {
    color: '#f3efe7',
    fontSize: 17,
    fontWeight: '700',
  },
  formTitleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  formBrand: {
    color: '#d8ab58',
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Georgia',
  },
  formHeading: {
    color: '#e7d3ad',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 3,
  },
  keyboardView: {
    flex: 1,
  },
  formContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
  },
  fieldLabel: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f4f0eb',
    borderWidth: 1,
    borderColor: '#d4c9bf',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 18,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  selectBox: {
    backgroundColor: '#f4f0eb',
    borderWidth: 1,
    borderColor: '#d4c9bf',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  selectText: {
    color: COLORS.text,
    fontSize: 15,
  },
  placeholderText: {
    color: COLORS.muted,
  },
  chevron: {
    color: COLORS.text,
    fontSize: 24,
    marginLeft: 10,
  },
  courseOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  courseOption: {
    backgroundColor: '#f4f0eb',
    borderWidth: 1,
    borderColor: '#d4c9bf',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  courseOptionActive: {
    backgroundColor: '#d0a14d',
    borderColor: '#c6973c',
  },
  courseOptionText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  courseOptionTextActive: {
    color: '#fffaf5',
  },
  saveButton: {
    marginHorizontal: 18,
    marginBottom: 16,
    backgroundColor: '#d0a14d',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fffaf5',
    fontSize: 17,
    fontWeight: '800',
  },
  detailsContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
  },
  detailsImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 18,
  },
  detailsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailsName: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
    flex: 1,
  },
  detailsPrice: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '800',
    marginLeft: 12,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  pill: {
    backgroundColor: '#f1e7dd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d7cfc4',
  },
  pillText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
  },
  pillMuted: {
    backgroundColor: '#f1e7dd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d7cfc4',
  },
  pillMutedText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '600',
  },
  detailsInfoBox: {
    backgroundColor: '#f1e7dd',
    borderWidth: 1,
    borderColor: '#d7cfc4',
    borderRadius: 10,
    minHeight: 160,
    padding: 14,
  },
  detailsDescription: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
  },
  detailsButtonRow: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginBottom: 18,
    gap: 12,
  },
  detailsEditButton: {
    flex: 1,
    backgroundColor: '#d0a14d',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsDeleteButton: {
    flex: 1,
    backgroundColor: '#b95d5d',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsButtonText: {
    color: '#fffaf5',
    fontSize: 16,
    fontWeight: '700',
  },
});

