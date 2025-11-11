import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CampItem {
  id: string;
  name: string;
  icon: string;
  materials: { name: string; amount: number; icon: string }[];
}

const campCraftData: CampItem[] = [
  {
    id: '1',
    name: 'Костер',
    icon: 'Flame',
    materials: [
      { name: 'Дерево', amount: 6, icon: 'TreePine' },
      { name: 'Камень', amount: 4, icon: 'Mountain' }
    ]
  },
  {
    id: '2',
    name: 'Палатка',
    icon: 'Home',
    materials: [
      { name: 'Ткань', amount: 12, icon: 'Scroll' },
      { name: 'Веревка', amount: 6, icon: 'Cable' },
      { name: 'Дерево', amount: 5, icon: 'TreePine' }
    ]
  },
  {
    id: '3',
    name: 'Печь',
    icon: 'Warehouse',
    materials: [
      { name: 'Кирпич', amount: 20, icon: 'Box' },
      { name: 'Цемент', amount: 10, icon: 'Container' },
      { name: 'Железо', amount: 5, icon: 'Box' }
    ]
  },
  {
    id: '4',
    name: 'Забор',
    icon: 'Fence',
    materials: [
      { name: 'Дерево', amount: 15, icon: 'TreePine' },
      { name: 'Гвозди', amount: 8, icon: 'Wrench' }
    ]
  },
  {
    id: '5',
    name: 'Верстак',
    icon: 'Wrench',
    materials: [
      { name: 'Дерево', amount: 10, icon: 'TreePine' },
      { name: 'Железо', amount: 4, icon: 'Box' },
      { name: 'Веревка', amount: 2, icon: 'Cable' }
    ]
  }
];

const workbenchCraftData: CampItem[] = [
  {
    id: 'wb1',
    name: 'Топор',
    icon: 'Axe',
    materials: [
      { name: 'Железо', amount: 5, icon: 'Box' },
      { name: 'Дерево', amount: 3, icon: 'TreePine' },
      { name: 'Ткань', amount: 2, icon: 'Scroll' }
    ]
  },
  {
    id: 'wb2',
    name: 'Лопата',
    icon: 'Pickaxe',
    materials: [
      { name: 'Железо', amount: 4, icon: 'Box' },
      { name: 'Дерево', amount: 2, icon: 'TreePine' }
    ]
  },
  {
    id: 'wb3',
    name: 'Молоток',
    icon: 'Hammer',
    materials: [
      { name: 'Железо', amount: 3, icon: 'Box' },
      { name: 'Дерево', amount: 2, icon: 'TreePine' }
    ]
  },
  {
    id: 'wb4',
    name: 'Нож',
    icon: 'Knife',
    materials: [
      { name: 'Железо', amount: 2, icon: 'Box' },
      { name: 'Дерево', amount: 1, icon: 'TreePine' },
      { name: 'Кожа', amount: 1, icon: 'Square' }
    ]
  },
  {
    id: 'wb5',
    name: 'Пила',
    icon: 'Wrench',
    materials: [
      { name: 'Железо', amount: 6, icon: 'Box' },
      { name: 'Дерево', amount: 3, icon: 'TreePine' }
    ]
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<'camp' | 'workbench'>('camp');
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map());

  const toggleItem = (itemId: string) => {
    const newSelected = new Map(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.set(itemId, 1);
    }
    setSelectedItems(newSelected);
  };

  const updateAmount = (itemId: string, amount: number) => {
    const newSelected = new Map(selectedItems);
    if (amount <= 0) {
      newSelected.delete(itemId);
    } else {
      newSelected.set(itemId, amount);
    }
    setSelectedItems(newSelected);
  };

  const calculateTotalMaterials = () => {
    const totals = new Map<string, { amount: number; icon: string }>();
    const allData = [...campCraftData, ...workbenchCraftData];
    
    selectedItems.forEach((count, itemId) => {
      const item = allData.find(i => i.id === itemId);
      if (item) {
        item.materials.forEach(mat => {
          const current = totals.get(mat.name) || { amount: 0, icon: mat.icon };
          totals.set(mat.name, {
            amount: current.amount + (mat.amount * count),
            icon: mat.icon
          });
        });
      }
    });

    return Array.from(totals.entries()).map(([name, data]) => ({
      name,
      ...data
    }));
  };

  const totalMaterials = calculateTotalMaterials();
  const hasSelection = selectedItems.size > 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Icon name="Flame" size={32} className="text-primary" />
            <h1 className="text-3xl font-bold">Day R Калькулятор</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex gap-3 mb-6">
            <Button
              variant={activeSection === 'camp' ? 'default' : 'outline'}
              onClick={() => setActiveSection('camp')}
              className="flex items-center gap-2"
            >
              <Icon name="Home" size={20} />
              Крафт лагеря
            </Button>
            <Button
              variant={activeSection === 'workbench' ? 'default' : 'outline'}
              onClick={() => setActiveSection('workbench')}
              className="flex items-center gap-2"
            >
              <Icon name="Wrench" size={20} />
              Верстак
            </Button>
          </div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Icon name={activeSection === 'camp' ? 'Home' : 'Wrench'} size={28} className="text-primary" />
            {activeSection === 'camp' ? 'Крафт лагеря' : 'Крафт на верстаке'}
          </h2>
          <p className="text-muted-foreground">
            {activeSection === 'camp' 
              ? 'Выберите постройки для расчёта необходимых материалов'
              : 'Выберите инструменты для крафта на верстаке'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {(activeSection === 'camp' ? campCraftData : workbenchCraftData).map(item => {
              const isSelected = selectedItems.has(item.id);
              const amount = selectedItems.get(item.id) || 1;

              return (
                <Card
                  key={item.id}
                  className={`p-5 transition-all ${
                    isSelected ? 'ring-2 ring-primary bg-accent/30' : 'hover:bg-accent/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center cursor-pointer"
                      onClick={() => toggleItem(item.id)}
                    >
                      <Icon name={item.icon as any} size={28} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="font-bold text-lg mb-3 cursor-pointer"
                        onClick={() => toggleItem(item.id)}
                      >
                        {item.name}
                      </h3>
                      <div className="space-y-1.5">
                        {item.materials.map((mat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name={mat.icon as any} size={16} className="text-secondary" />
                            <span>{mat.name}: {mat.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateAmount(item.id, amount - 1)}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="font-bold text-lg w-8 text-center">{amount}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateAmount(item.id, amount + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <Icon name="Package" size={24} className="text-primary" />
                <h3 className="text-xl font-bold">Итого материалов</h3>
              </div>

              {hasSelection ? (
                <div className="space-y-3">
                  {totalMaterials.map((mat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-background flex items-center justify-center">
                          <Icon name={mat.icon as any} size={20} className="text-secondary" />
                        </div>
                        <span className="font-medium text-lg">{mat.name}</span>
                      </div>
                      <span className="text-2xl font-bold text-primary">{mat.amount}</span>
                    </div>
                  ))}

                  <div className="pt-4 mt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Info" size={16} />
                      <span>Выбрано построек: {selectedItems.size}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="MousePointerClick" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Нажмите на постройки слева, чтобы увидеть расчет материалов
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}