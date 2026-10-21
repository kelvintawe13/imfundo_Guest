import { ChatWidget } from './ChatWidget';
import { MobileNavFab } from './MobileNavFab';
import { PartnerModal } from '../modals/PartnerModal';
import { LessonSettingsModal } from '../modals/LessonSettingsModal';
import { SyncDetailsModal } from '../modals/SyncDetailsModal';

export function GlobalOverlays() {
  return (
    <>
      <MobileNavFab />
      <ChatWidget />
      <PartnerModal />
      <LessonSettingsModal />
      <SyncDetailsModal />
    </>);

}