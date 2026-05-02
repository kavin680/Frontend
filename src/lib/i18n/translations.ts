export type Locale = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh' | 'pt' | 'ar';

export interface TranslationKeys {
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    create: string;
    search: string;
    loading: string;
    error: string;
    success: string;
    confirm: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    reset: string;
  };
  auth: {
    login: string;
    register: string;
    logout: string;
    forgotPassword: string;
    resetPassword: string;
    email: string;
    password: string;
    rememberMe: string;
  };
  dashboard: {
    title: string;
    overview: string;
    analytics: string;
    settings: string;
    admin: string;
  };
  nav: {
    dashboard: string;
    analytics: string;
    billing: string;
    settings: string;
    admin: string;
    plugins: string;
    notifications: string;
  };
}

export const translations: Record<Locale, TranslationKeys> = {
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      search: 'Search',
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      reset: 'Reset',
    },
    auth: {
      login: 'Sign in',
      register: 'Create account',
      logout: 'Sign out',
      forgotPassword: 'Forgot password?',
      resetPassword: 'Reset password',
      email: 'Email',
      password: 'Password',
      rememberMe: 'Remember me',
    },
    dashboard: {
      title: 'Dashboard',
      overview: 'Overview',
      analytics: 'Analytics',
      settings: 'Settings',
      admin: 'Administration',
    },
    nav: {
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      billing: 'Billing',
      settings: 'Settings',
      admin: 'Admin',
      plugins: 'Plugins',
      notifications: 'Notifications',
    },
  },
  es: {
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      create: 'Crear',
      search: 'Buscar',
      loading: 'Cargando...',
      error: 'Ocurrió un error',
      success: 'Éxito',
      confirm: 'Confirmar',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      submit: 'Enviar',
      reset: 'Restablecer',
    },
    auth: {
      login: 'Iniciar sesión',
      register: 'Crear cuenta',
      logout: 'Cerrar sesión',
      forgotPassword: '¿Olvidaste tu contraseña?',
      resetPassword: 'Restablecer contraseña',
      email: 'Correo electrónico',
      password: 'Contraseña',
      rememberMe: 'Recordarme',
    },
    dashboard: {
      title: 'Panel',
      overview: 'Resumen',
      analytics: 'Analíticas',
      settings: 'Configuración',
      admin: 'Administración',
    },
    nav: {
      dashboard: 'Panel',
      analytics: 'Analíticas',
      billing: 'Facturación',
      settings: 'Configuración',
      admin: 'Admin',
      plugins: 'Plugins',
      notifications: 'Notificaciones',
    },
  },
  fr: {
    common: { save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer', edit: 'Modifier', create: 'Créer', search: 'Rechercher', loading: 'Chargement...', error: 'Une erreur est survenue', success: 'Succès', confirm: 'Confirmer', back: 'Retour', next: 'Suivant', previous: 'Précédent', submit: 'Soumettre', reset: 'Réinitialiser' },
    auth: { login: 'Se connecter', register: 'Créer un compte', logout: 'Se déconnecter', forgotPassword: 'Mot de passe oublié ?', resetPassword: 'Réinitialiser le mot de passe', email: 'E-mail', password: 'Mot de passe', rememberMe: 'Se souvenir de moi' },
    dashboard: { title: 'Tableau de bord', overview: 'Aperçu', analytics: 'Analytique', settings: 'Paramètres', admin: 'Administration' },
    nav: { dashboard: 'Tableau de bord', analytics: 'Analytique', billing: 'Facturation', settings: 'Paramètres', admin: 'Admin', plugins: 'Plugins', notifications: 'Notifications' },
  },
  de: {
    common: { save: 'Speichern', cancel: 'Abbrechen', delete: 'Löschen', edit: 'Bearbeiten', create: 'Erstellen', search: 'Suchen', loading: 'Laden...', error: 'Ein Fehler ist aufgetreten', success: 'Erfolg', confirm: 'Bestätigen', back: 'Zurück', next: 'Weiter', previous: 'Zurück', submit: 'Absenden', reset: 'Zurücksetzen' },
    auth: { login: 'Anmelden', register: 'Konto erstellen', logout: 'Abmelden', forgotPassword: 'Passwort vergessen?', resetPassword: 'Passwort zurücksetzen', email: 'E-Mail', password: 'Passwort', rememberMe: 'Angemeldet bleiben' },
    dashboard: { title: 'Dashboard', overview: 'Übersicht', analytics: 'Analytik', settings: 'Einstellungen', admin: 'Verwaltung' },
    nav: { dashboard: 'Dashboard', analytics: 'Analytik', billing: 'Abrechnung', settings: 'Einstellungen', admin: 'Admin', plugins: 'Plugins', notifications: 'Benachrichtigungen' },
  },
  ja: {
    common: { save: '保存', cancel: 'キャンセル', delete: '削除', edit: '編集', create: '作成', search: '検索', loading: '読み込み中...', error: 'エラーが発生しました', success: '成功', confirm: '確認', back: '戻る', next: '次へ', previous: '前へ', submit: '送信', reset: 'リセット' },
    auth: { login: 'ログイン', register: 'アカウント作成', logout: 'ログアウト', forgotPassword: 'パスワードを忘れた場合', resetPassword: 'パスワードリセット', email: 'メール', password: 'パスワード', rememberMe: 'ログイン状態を保持' },
    dashboard: { title: 'ダッシュボード', overview: '概要', analytics: '分析', settings: '設定', admin: '管理' },
    nav: { dashboard: 'ダッシュボード', analytics: '分析', billing: '請求', settings: '設定', admin: '管理', plugins: 'プラグイン', notifications: '通知' },
  },
  zh: {
    common: { save: '保存', cancel: '取消', delete: '删除', edit: '编辑', create: '创建', search: '搜索', loading: '加载中...', error: '发生错误', success: '成功', confirm: '确认', back: '返回', next: '下一步', previous: '上一步', submit: '提交', reset: '重置' },
    auth: { login: '登录', register: '注册', logout: '退出', forgotPassword: '忘记密码？', resetPassword: '重置密码', email: '邮箱', password: '密码', rememberMe: '记住我' },
    dashboard: { title: '仪表盘', overview: '概览', analytics: '分析', settings: '设置', admin: '管理' },
    nav: { dashboard: '仪表盘', analytics: '分析', billing: '账单', settings: '设置', admin: '管理', plugins: '插件', notifications: '通知' },
  },
  pt: {
    common: { save: 'Salvar', cancel: 'Cancelar', delete: 'Excluir', edit: 'Editar', create: 'Criar', search: 'Pesquisar', loading: 'Carregando...', error: 'Ocorreu um erro', success: 'Sucesso', confirm: 'Confirmar', back: 'Voltar', next: 'Próximo', previous: 'Anterior', submit: 'Enviar', reset: 'Redefinir' },
    auth: { login: 'Entrar', register: 'Criar conta', logout: 'Sair', forgotPassword: 'Esqueceu a senha?', resetPassword: 'Redefinir senha', email: 'E-mail', password: 'Senha', rememberMe: 'Lembrar-me' },
    dashboard: { title: 'Painel', overview: 'Visão geral', analytics: 'Análises', settings: 'Configurações', admin: 'Administração' },
    nav: { dashboard: 'Painel', analytics: 'Análises', billing: 'Faturamento', settings: 'Configurações', admin: 'Admin', plugins: 'Plugins', notifications: 'Notificações' },
  },
  ar: {
    common: { save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', edit: 'تعديل', create: 'إنشاء', search: 'بحث', loading: 'جاري التحميل...', error: 'حدث خطأ', success: 'نجاح', confirm: 'تأكيد', back: 'رجوع', next: 'التالي', previous: 'السابق', submit: 'إرسال', reset: 'إعادة تعيين' },
    auth: { login: 'تسجيل الدخول', register: 'إنشاء حساب', logout: 'تسجيل الخروج', forgotPassword: 'نسيت كلمة المرور؟', resetPassword: 'إعادة تعيين كلمة المرور', email: 'البريد الإلكتروني', password: 'كلمة المرور', rememberMe: 'تذكرني' },
    dashboard: { title: 'لوحة التحكم', overview: 'نظرة عامة', analytics: 'التحليلات', settings: 'الإعدادات', admin: 'الإدارة' },
    nav: { dashboard: 'لوحة التحكم', analytics: 'التحليلات', billing: 'الفواتير', settings: 'الإعدادات', admin: 'الإدارة', plugins: 'الإضافات', notifications: 'الإشعارات' },
  },
};

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] ?? translations.en;
}
