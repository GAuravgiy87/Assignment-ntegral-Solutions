import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, Languages } from "lucide-react";

interface LanguageTranslatorProps {
  defaultSourceLang?: string;
  defaultTargetLang?: string;
}

interface Language {
  code: string;
  name: string;
}

// Common phrases in different languages
const commonPhrases: Record<string, Record<string, string>> = {
  "Hello": {
    "en": "Hello",
    "ja": "こんにちは (Konnichiwa)",
    "fr": "Bonjour",
    "es": "Hola",
    "de": "Hallo",
    "zh": "你好 (Nǐ hǎo)",
    "ko": "안녕하세요 (Annyeonghaseyo)"
  },
  "Thank you": {
    "en": "Thank you",
    "ja": "ありがとう (Arigatou)",
    "fr": "Merci",
    "es": "Gracias",
    "de": "Danke",
    "zh": "谢谢 (Xièxiè)",
    "ko": "감사합니다 (Gamsahamnida)"
  },
  "Excuse me": {
    "en": "Excuse me",
    "ja": "すみません (Sumimasen)",
    "fr": "Excusez-moi",
    "es": "Disculpe",
    "de": "Entschuldigung",
    "zh": "对不起 (Duìbùqǐ)",
    "ko": "실례합니다 (Sillyehamnida)"
  },
  "Where is the bathroom?": {
    "en": "Where is the bathroom?",
    "ja": "お手洗いはどこですか？ (Otearai wa doko desu ka?)",
    "fr": "Où sont les toilettes?",
    "es": "¿Dónde está el baño?",
    "de": "Wo ist die Toilette?",
    "zh": "洗手间在哪里？ (Xǐshǒujiān zài nǎlǐ?)",
    "ko": "화장실이 어디에 있습니까? (Hwajangsil-i eodie issseumnikka?)"
  },
  "How much is this?": {
    "en": "How much is this?",
    "ja": "これはいくらですか？ (Kore wa ikura desu ka?)",
    "fr": "Combien ça coûte?",
    "es": "¿Cuánto cuesta esto?",
    "de": "Wie viel kostet das?",
    "zh": "这个多少钱？ (Zhège duōshǎo qián?)",
    "ko": "이거 얼마예요? (Igeo eolmayeyo?)"
  },
  "I don't understand": {
    "en": "I don't understand",
    "ja": "わかりません (Wakarimasen)",
    "fr": "Je ne comprends pas",
    "es": "No entiendo",
    "de": "Ich verstehe nicht",
    "zh": "我不明白 (Wǒ bù míngbái)",
    "ko": "이해가 안 됩니다 (Ihaega an doepnida)"
  }
};

export function LanguageTranslator({
  defaultSourceLang = "en",
  defaultTargetLang = "ja"
}: LanguageTranslatorProps) {
  const [sourceLang, setSourceLang] = useState<string>(defaultSourceLang);
  const [targetLang, setTargetLang] = useState<string>(defaultTargetLang);
  const [textToTranslate, setTextToTranslate] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [commonPhrase, setCommonPhrase] = useState<string>("");

  // List of supported languages
  const languages: Language[] = [
    { code: "en", name: "English" },
    { code: "ja", name: "Japanese" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
    { code: "ko", name: "Korean" }
  ];

  // Handle language swap
  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setTextToTranslate(translatedText);
    setTranslatedText(textToTranslate);
  };

  // Handle translation (mock implementation)
  const handleTranslate = () => {
    if (!textToTranslate) return;
    
    setIsTranslating(true);
    
    // In a real app, we would call a translation API here
    setTimeout(() => {
      // Check if the input matches any of our common phrases
      let translated = "";
      
      for (const [phrase, translations] of Object.entries(commonPhrases)) {
        if (textToTranslate.toLowerCase() === phrase.toLowerCase() || 
            textToTranslate === translations[sourceLang]) {
          translated = translations[targetLang] || textToTranslate;
          break;
        }
      }
      
      // If not found in common phrases, generate a mock translation
      if (!translated) {
        translated = `[${targetLang.toUpperCase()}] ${textToTranslate}`;
      }
      
      setTranslatedText(translated);
      setIsTranslating(false);
    }, 700);
  };

  // Handle common phrase selection
  useEffect(() => {
    if (commonPhrase) {
      setTextToTranslate(commonPhrases[commonPhrase][sourceLang] || commonPhrase);
      handleTranslate();
    }
  }, [commonPhrase, sourceLang]);

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium dark:text-white text-gray-800 mb-3">Language Translator</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSwapLanguages}
              className="h-8 w-8"
            >
              <ArrowDown className="h-4 w-4 rotate-90" />
            </Button>
            
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Input
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
            placeholder="Enter text to translate"
            className="w-full"
          />
          
          <Button 
            onClick={handleTranslate}
            disabled={!textToTranslate || isTranslating}
            className="w-full"
          >
            {isTranslating ? "Translating..." : "Translate"}
          </Button>
          
          {translatedText && (
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
              <p className="text-sm dark:text-white text-gray-800">{translatedText}</p>
            </div>
          )}
          
          <div className="pt-2">
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Common Phrases</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(commonPhrases).map((phrase) => (
                <Button 
                  key={phrase}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1.5 justify-start"
                  onClick={() => setCommonPhrase(phrase)}
                >
                  <Languages className="h-3.5 w-3.5 mr-1.5" />
                  {phrase}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}