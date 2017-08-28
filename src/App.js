// import { UiAlert, UiButton } from 'keen-ui';
import UiButton from 'keen-ui/lib/UiButton';


export default {
  data: () => ({
    isRed: true,
    size: 'normal',
  }),
  components: {
    UiButton,
  },
  render(h) {
    return (
      <div class={{ 'is-red': this.isRed }}>
        <p>Example Text</p>
        <ui-button type="secondary">Normal</ui-button>
      </div>
    );
  },
};
