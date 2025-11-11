import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';


interface CraftItem {
  id: string;
  name: string;
  icon: string;
  materials: { name: string; amount: number; icon: string }[];
}

const craftData: CraftItem[] = [
  {
    id: '1',
    name: 'Топор',
    icon: 'Axe',
    materials: [
      { name: 'Железо', amount: 5, icon: 'Box' },
      { name: 'Дерево', amount: 3, icon: 'TreePine' },
      { name: 'Ткань', amount: 2, icon: 'Scroll' }
    ]
  },
  {
    id: '2',
    name: 'Рюкзак',
    icon: 'Backpack',
    materials: [
      { name: 'Ткань', amount: 8, icon: 'Scroll' },
      { name: 'Веревка', amount: 4, icon: 'Cable' },
      { name: 'Кожа', amount: 3, icon: 'Square' }
    ]
  },
  {
    id: '3',
    name: 'Костер',
    icon: 'Flame',
    materials: [
      { name: 'Дерево', amount: 6, icon: 'TreePine' },
      { name: 'Камень', amount: 4, icon: 'Mountain' }
    ]
  },
  {
    id: '4',
    name: 'Аптечка',
    icon: 'Heart',
    materials: [
      { name: 'Бинты', amount: 5, icon: 'Bandage' },
      { name: 'Антисептик', amount: 2, icon: 'Droplet' },
      { name: 'Таблетки', amount: 3, icon: 'Pill' }
    ]
  },
  {
    id: '5',
    name: 'Лук',
    icon: 'Target',
    materials: [
      { name: 'Дерево', amount: 4, icon: 'TreePine' },
      { name: 'Веревка', amount: 2, icon: 'Cable' },
      { name: 'Железо', amount: 1, icon: 'Box' }
    ]
  },
  {
    id: '6',
    name: 'Палатка',
    icon: 'Home',
    materials: [
      { name: 'Ткань', amount: 12, icon: 'Scroll' },
      { name: 'Веревка', amount: 6, icon: 'Cable' },
      { name: 'Дерево', amount: 5, icon: 'TreePine' }
    ]
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<CraftItem | null>(null);
  const [craftAmount, setCraftAmount] = useState(1);

  const filteredItems = useMemo(() => {
    return craftData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const calculateMaterials = useMemo(() => {
    if (!selectedItem) return [];
    return selectedItem.materials.map(mat => ({
      ...mat,
      totalAmount: mat.amount * craftAmount
    }));
  }, [selectedItem, craftAmount]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Icon name="Flame" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">Day R Калькулятор Крафта</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск предметов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </Card>

            <div className="grid gap-3">
              {filteredItems.map(item => (
                <Card
                  key={item.id}
                  className={`p-4 cursor-pointer transition-all hover:bg-accent/50 ${
                    selectedItem?.id === item.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    setSelectedItem(item);
                    setCraftAmount(1);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Icon name={item.icon as any} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </div>
                </Card>
              ))}

              {filteredItems.length === 0 && (
                <Card className="p-8 text-center">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Предметы не найдены</p>
                </Card>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            {selectedItem ? (
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                      <Icon name={selectedItem.icon as any} size={32} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Количество для крафта</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCraftAmount(Math.max(1, craftAmount - 1))}
                      >
                        <Icon name="Minus" size={16} />
                      </Button>
                      <Input
                        type="number"
                        value={craftAmount}
                        onChange={(e) => setCraftAmount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="text-center font-semibold text-lg"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCraftAmount(craftAmount + 1)}
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon name="Package" size={20} className="text-primary" />
                      <h3 className="font-semibold">Необходимые материалы</h3>
                    </div>
                    <div className="space-y-2">
                      {calculateMaterials.map((mat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-background flex items-center justify-center">
                              <Icon name={mat.icon as any} size={20} className="text-secondary" />
                            </div>
                            <span className="font-medium">{mat.name}</span>
                          </div>
                          <Badge className="text-base font-semibold px-3">
                            {mat.totalAmount}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Info" size={16} />
                      <span>Всего материалов: {calculateMaterials.reduce((sum, mat) => sum + mat.totalAmount, 0)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Icon name="MousePointerClick" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Выберите предмет</h3>
                <p className="text-muted-foreground">
                  Нажмите на предмет слева, чтобы увидеть расчет материалов для крафта
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}