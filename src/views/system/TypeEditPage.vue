<!-- TEMPLATE BEGIN -->
<template>
  <div class="type-edit-page">
    <page-content :loading="loadingInProcess">
      <template slot="header">
        Типы
      </template>

      <b-tabs>
        <b-tab title="События" active>
          <br>
          <b-row>
            <b-col cols="12" sm="auto" class="ml-auto">
              <b-button variant="success" class="w-100" @click="showEventTypeModal()" v-if="canEditEventType">Добавить</b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-card v-for="eventType in eventTypes" :key="eventType.id" class="mb-1">
                <b-row>
                  <b-col>
                    <b-row style="line-height: 31px">
                      <b-col cols="12" md="6">
                        <b>{{ eventType.title }}</b>
                      </b-col>
                      <b-col cols="12" md="6">
                        {{ eventType.description }}
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="12" md="auto" class="ml-md-auto d-flex align-content-between align-items-start" v-if="canEditEventType">
                    <b-button variant="warning" class="btn-sm w-100 mr-md-1 order-3 order-md-2" @click="showEventTypeModal(eventType)">Изменить</b-button>
                    <b-button variant="outline-danger" class="btn-sm w-100 mr-1 mr-md-0 order-1 order-md-3" @click="onRemoveEventType(eventType)">
                      <icon name="times" class="d-none d-md-inline" style="position: relative; top: -2px;"></icon>
                      <span class="d-inline d-md-none">Удалить</span>
                    </b-button>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Роли">
          <br>
          <b-row>
            <b-col cols="12" sm="auto" class="ml-auto">
              <b-button variant="success" class="w-100" @click="showEventRoleModal()">Добавить</b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-card v-for="eventRole in eventRoles" :key="eventRole.id" class="mb-1">
                <b-row>
                  <b-col>
                    <b-row style="line-height: 31px">
                      <b-col cols="12" md="6">
                        <b>{{ eventRole.title }}</b>
                      </b-col>
                      <b-col cols="12" md="6">
                        {{ eventRole.description }}
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="12" md="auto" class="ml-md-auto d-flex align-content-between align-items-start">
                    <b-button variant="warning" class="btn-sm w-100 order-3 order-md-2" v-bind:class="{'mr-md-1': canDeleteEventRole }" @click="showEventRoleModal(eventRole)">Изменить</b-button>
                    <b-button variant="outline-danger" class="btn-sm w-100 mr-1 mr-md-0 order-1 order-md-3" @click="onRemoveEventRole(eventRole)" v-if="canDeleteEventRole">
                      <icon name="times" class="d-none d-md-inline" style="position: relative; top: -2px;"></icon>
                      <span class="d-inline d-md-none">Удалить</span>
                    </b-button>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Оборудование">
          <br>
          <b-row>
            <b-col cols="12" sm="auto" class="ml-auto">
              <b-button variant="success" class="w-100" @click="showEquipmentTypeModal()" v-if="canEditEquipmentType">Добавить</b-button>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-card v-for="equipmentType in equipmentTypes" :key="equipmentType.id" class="mb-1">
                <b-row>
                  <b-col>
                    <b-row style="line-height: 31px">
                      <b-col cols="12" md="6">
                        <b>{{ equipmentType.title }}</b>
                      </b-col>
                      <b-col cols="12" md="6">
                        {{ equipmentType.description }}
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="12" md="auto" class="ml-md-auto d-flex align-content-between align-items-start" v-if="canEditEquipmentType">
                    <b-button variant="warning" class="btn-sm w-100 mr-md-1 order-3 order-md-2" @click="showEquipmentTypeModal(equipmentType)">Изменить</b-button>
                    <b-button variant="outline-danger" class="btn-sm w-100 mr-1 mr-md-0 order-1 order-md-3" @click="onRemoveEquipmentType(equipmentType)">
                      <icon name="times" class="d-none d-md-inline" style="position: relative; top: -2px;"></icon>
                      <span class="d-inline d-md-none">Удалить</span>
                    </b-button>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </page-content>

    <event-type-modal v-model="eventTypeModalVisible" :data="eventTypeModalData" :onSubmit="onSubmitEventTypeModal" />
    <event-role-modal v-model="eventRoleModalVisible" :data="eventRoleModalData" :onSubmit="onSubmitEventRoleModal" />
    <equipment-type-modal v-model="equipmentTypeModalVisible" :data="equipmentTypeModalData" :onSubmit="onSubmitEquipmentTypeModal" />
  </div>
</template>
<!-- TEMPLATE END -->


<!-- SCRIPT BEGIN -->
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

import Icon from 'vue-awesome/components/Icon';
import CPageContent from '@/components/layout/PageContent.vue';
import CEventTypeModal from '@/components/modals/EventTypeModal.vue';
import CEventRoleModal from '@/components/modals/EventRoleModal.vue';
import CEquipmentTypeModal from '@/components/modals/EquipmentTypeModal.vue';

import 'vue-awesome/icons/times';

import {
  IEquipmentType,
  EquipmentTypeDefault,
  EQUIPMENT_TYPES_FETCH_ALL,
  EQUIPMENT_TYPES_GET_ALL,
  EQUIPMENT_TYPE_DELETE
} from '@/modules/equipment';

import {
  IEventType,
  EventTypeDefault,
  IEventRole,
  EventRoleDefault,
  EVENT_TYPES_FETCH_ALL,
  EVENT_TYPES_GET_ALL,
  EVENT_TYPE_DELETE,
  EVENT_ROLES_GET_ALL,
  EVENT_ROLES_FETCH_ALL,
  EVENT_ROLE_DELETE
} from '@/modules/events';

@Component({
  components: {
    Icon,
    'page-content': CPageContent,
    'event-type-modal': CEventTypeModal,
    'event-role-modal': CEventRoleModal,
    'equipment-type-modal': CEquipmentTypeModal
  }
})
export default class TypeEditPage extends Vue {
  // Properties //
  ///////////////

  public loadingInProcess: boolean = true;

  public eventTypeModalVisible: boolean = false;
  public eventTypeModalData: IEventType = new EventTypeDefault();

  public eventRoleModalVisible: boolean = false;
  public eventRoleModalData: IEventRole = new EventRoleDefault();

  public equipmentTypeModalVisible: boolean = false;
  public equipmentTypeModalData: IEquipmentType = new EquipmentTypeDefault();

  // Component methods //
  //////////////////////

  public mounted() {
    Promise.all([
      this.$store.dispatch(EVENT_TYPES_FETCH_ALL),
      this.$store.dispatch(EVENT_ROLES_FETCH_ALL),
      this.$store.dispatch(EQUIPMENT_TYPES_FETCH_ALL)
    ])
      .then((results) => {
        this.loadingInProcess = false;
      })
      .catch();
  }

  // EventType modal methods //
  ////////////////////////////

  public showEventTypeModal(eventType?: IEventType) {
    if (eventType) {
      this.eventTypeModalData = Object.assign({}, eventType);
    } else {
      this.eventTypeModalData = new EventTypeDefault();
    }
    this.eventTypeModalVisible = true;
  }

  public onRemoveEventType(eventType: IEventType) {
    if (!confirm('Вы действительно хотите удалить тип события?')) {
      return;
    }

    this.$store.dispatch(EVENT_TYPE_DELETE, eventType);
  }

  public onSubmitEventTypeModal(eventType: IEventType) {
    this.eventTypeModalVisible = false;
  }

  // EventRole modal methods //
  ////////////////////////////

  public showEventRoleModal(eventRole?: IEventRole) {
    if (eventRole) {
      this.eventRoleModalData = Object.assign({}, eventRole);
    } else {
      this.eventRoleModalData = new EventRoleDefault();
    }
    this.eventRoleModalVisible = true;
  }

  public onRemoveEventRole(eventRole?: IEventRole) {
    if (!confirm('Вы действительно хотите удалить эту роль?')) {
      return;
    }

    this.$store.dispatch(EVENT_ROLE_DELETE, eventRole);
  }

  public onSubmitEventRoleModal(eventRole: IEventRole) {
    this.eventRoleModalVisible = false;
  }

  // EquipmentType modal methods //
  ////////////////////////////////

  public showEquipmentTypeModal(equipmentType?: IEquipmentType) {
    if (equipmentType) {
      this.equipmentTypeModalData = Object.assign({}, equipmentType);
    } else {
      this.equipmentTypeModalData = new EquipmentTypeDefault();
    }
    this.equipmentTypeModalVisible = true;
  }

  public onRemoveEquipmentType(equipmentType: IEquipmentType) {
    if (!confirm('Вы действительно хотите удалить тип оборудования?')) {
      return;
    }

    this.$store.dispatch(EQUIPMENT_TYPE_DELETE, equipmentType);
  }

  public onSubmitEquipmentTypeModal(equipmentType: IEquipmentType) {
    this.equipmentTypeModalVisible = false;
  }

  // Computed data //
  //////////////////

  get eventTypes(): IEventType[] {
    return this.$store.getters[EVENT_TYPES_GET_ALL];
  }

  get canEditEventType(): boolean {
    return this.$g.hasRole('CanEditEventType');
  }

  get eventRoles(): IEventRole[] {
    return this.$store.getters[EVENT_ROLES_GET_ALL];
  }

  get canDeleteEventRole(): boolean {
    return this.$g.hasRole('CanDeleteEventRole');
  }

  get equipmentTypes(): IEquipmentType[] {
    return this.$store.getters[EQUIPMENT_TYPES_GET_ALL];
  }

  get canEditEquipmentType(): boolean {
    return this.$g.hasRole('CanEditEquipmentType');
  }
}

export const typeEditPageRoute: RouteConfig = {
  path: '/type_edit',
  name: 'TypeEditPage',
  component: TypeEditPage
};
</script>
<!-- SCRIPT END -->


<!-- STYLE BEGIN -->
<style lang="scss">
.type-edit-page {
  .nav-tabs {
    .nav-item .nav-link {
      border: none;
    }
  }

  .card-body {
    padding: 10px 15px;
  }
}
</style>
<!-- STYLE END -->
